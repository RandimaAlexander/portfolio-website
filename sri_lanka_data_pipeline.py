"""Sri Lanka macroeconomic data cleaning and transformation pipeline.

This script:
1. Loads a World Bank-style CSV file.
2. Filters Sri Lanka and selected indicators.
3. Reshapes from wide to long format.
4. Cleans values and years.
5. Pivots to a final wide table.
6. Interpolates missing values.
7. Exports to Excel and prints preview/statistics.
"""

from __future__ import annotations

from pathlib import Path

import pandas as pd


# Input/output paths requested by the user.
# Note: On non-Windows systems, these are treated as plain strings.
INPUT_PATH = Path(r"C:\Users\Dell\OneDrive\RANDIMA_IIT\srilnaka.csv")
OUTPUT_PATH = Path(r"C:\Users\Dell\OneDrive\RANDIMA_IIT\sri_lanka_clean_final.xlsx")

# Allow running in environments where the Windows path is unavailable by
# falling back to a local file with the same dataset name.
FALLBACK_INPUT_PATH = Path("srilnaka.csv")

TARGET_COUNTRY = "Sri Lanka"
INDICATOR_MAP = {
    "GDP growth (annual %)": "GDP Growth",
    "Inflation, consumer prices (annual %)": "Inflation",
    "Household final consumption expenditure (current US$)": "Consumption",
    "Imports of goods and services (% of GDP)": "Imports",
}


def resolve_input_path() -> Path:
    """Return a usable input path, preferring the requested absolute path."""
    if INPUT_PATH.exists():
        return INPUT_PATH
    if FALLBACK_INPUT_PATH.exists():
        return FALLBACK_INPUT_PATH
    raise FileNotFoundError(
        "Input CSV not found. Checked:\n"
        f"- {INPUT_PATH}\n"
        f"- {FALLBACK_INPUT_PATH.resolve()}"
    )


def load_and_filter_data(csv_path: Path) -> pd.DataFrame:
    """Load CSV and keep only Sri Lanka rows for required indicators."""
    df = pd.read_csv(csv_path)

    # Remove known unnecessary columns if present.
    cols_to_drop = [col for col in ["Country Code", "Series Code"] if col in df.columns]
    if cols_to_drop:
        df = df.drop(columns=cols_to_drop)

    # Normalize expected key column names.
    expected_columns = {"Country Name", "Series Name"}
    missing_required = expected_columns - set(df.columns)
    if missing_required:
        raise KeyError(f"Missing required columns: {sorted(missing_required)}")

    filtered = df[
        (df["Country Name"].eq(TARGET_COUNTRY))
        & (df["Series Name"].isin(INDICATOR_MAP.keys()))
    ].copy()

    if filtered.empty:
        raise ValueError(
            "No rows found after filtering for Sri Lanka and required indicators."
        )

    return filtered


def to_long_clean_format(filtered_df: pd.DataFrame) -> pd.DataFrame:
    """Convert wide year columns to long format and clean types."""
    id_vars = ["Country Name", "Series Name"]
    value_vars = [col for col in filtered_df.columns if col not in id_vars]

    long_df = filtered_df.melt(
        id_vars=id_vars,
        value_vars=value_vars,
        var_name="YearRaw",
        value_name="Value",
    )

    # Extract 4-digit year from columns like "1990 [YR1990]" or "1990".
    long_df["Year"] = (
        long_df["YearRaw"].astype(str).str.extract(r"(\d{4})", expand=False)
    )
    long_df["Year"] = pd.to_numeric(long_df["Year"], errors="coerce")

    # Convert values to numeric and coerce inconsistent types/errors to NaN.
    long_df["Value"] = pd.to_numeric(long_df["Value"], errors="coerce")

    # Keep year range and remove missing values.
    long_df = long_df.dropna(subset=["Year", "Value"])
    long_df["Year"] = long_df["Year"].astype(int)
    long_df = long_df[long_df["Year"].between(1990, 2025)].copy()

    return long_df


def to_final_wide_format(long_df: pd.DataFrame) -> pd.DataFrame:
    """Pivot long data to final wide format with interpolation."""
    long_df["Indicator"] = long_df["Series Name"].map(INDICATOR_MAP)

    final_df = (
        long_df.pivot_table(
            index="Year",
            columns="Indicator",
            values="Value",
            aggfunc="mean",
        )
        .reset_index()
        .rename_axis(None, axis=1)
    )

    # Ensure all required columns are present and in requested order.
    required_order = ["Year", "GDP Growth", "Inflation", "Consumption", "Imports"]
    for col in required_order:
        if col not in final_df.columns:
            final_df[col] = pd.NA
    final_df = final_df[required_order]

    # Sort by year and interpolate missing numeric values.
    final_df = final_df.sort_values("Year").reset_index(drop=True)
    numeric_cols = [c for c in final_df.columns if c != "Year"]

    final_df[numeric_cols] = final_df[numeric_cols].apply(
        pd.to_numeric, errors="coerce"
    )
    final_df[numeric_cols] = final_df[numeric_cols].interpolate(
        method="linear", limit_direction="both"
    )

    return final_df


def export_and_report(final_df: pd.DataFrame, output_path: Path) -> None:
    """Export cleaned dataset and print preview/statistics."""
    # Create output directory if it exists as a parent path on current OS.
    output_path.parent.mkdir(parents=True, exist_ok=True)
    final_df.to_excel(output_path, index=False)

    print("\n=== Cleaned Dataset Preview ===")
    print(final_df.head(10))

    print("\n=== Summary Statistics ===")
    print(final_df.describe(include="all"))

    print(f"\nSaved cleaned dataset to: {output_path}")


def main() -> None:
    """Run the complete Sri Lanka data pipeline."""
    csv_path = resolve_input_path()
    filtered_df = load_and_filter_data(csv_path)
    long_df = to_long_clean_format(filtered_df)
    final_df = to_final_wide_format(long_df)
    export_and_report(final_df, OUTPUT_PATH)


if __name__ == "__main__":
    main()
