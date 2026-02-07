"""Flask application for Randima Alexander's portfolio website."""
from datetime import datetime
from flask import Flask, render_template, request

app = Flask(__name__)


@app.context_processor
def inject_globals():
    """Provide global template variables."""
    return {"current_year": datetime.now().year}


@app.route("/")
def home():
    """Render the home page."""
    return render_template("index.html")


@app.route("/about")
def about():
    """Render the about page."""
    return render_template("about.html")


@app.route("/skills")
def skills():
    """Render the skills page."""
    return render_template("skills.html")


@app.route("/projects")
def projects():
    """Render the projects page."""
    return render_template("projects.html")


@app.route("/contact", methods=["GET", "POST"])
def contact():
    """Render the contact page and simulate form submission handling."""
    status_message = None
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("email")
        message = request.form.get("message")

        if name and email and message:
            status_message = (
                "Thanks for reaching out, {name}! I'll get back to you shortly."
            ).format(name=name)
        else:
            status_message = "Please fill out all fields so I can respond."  # simple validation

    return render_template("contact.html", status_message=status_message)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
