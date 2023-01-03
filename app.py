from flask import Flask, render_template

app = Flask(__name__)

cards = []
for i in range (16):
    cards.append(i)

@app.route('/')
def index():
    return render_template('index.html', cardNo = cards)

@app.route('/about')
def about():
    return render_template('about.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html', message=e)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
