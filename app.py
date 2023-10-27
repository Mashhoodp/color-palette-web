import base64

from flask import Flask, render_template, request
from colorthief import ColorThief

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    if request.method == 'POST':
        image = request.files['file']
        img_str = base64.b64encode(image.read()).decode('utf-8')
        ct = ColorThief(image)
        palette = ct.get_palette(color_count=4)
        hex_values = [f"#{rgb_to_hex(color)}" for color in palette]
        return render_template('result.html', colors=hex_values, image=img_str)


def rgb_to_hex(rgb):
    return '%02x%02x%02x' % rgb


if __name__ == '__main__':
    app.run(debug=True)
