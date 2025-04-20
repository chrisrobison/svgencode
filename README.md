# SVG to CSS Encoder

![SVG to CSS Encoder Logo](docs/images/logo.svg)

A powerful, browser-based tool for encoding SVG files into CSS-ready data URIs. This lightweight utility makes it easy to embed SVG graphics directly in your CSS, reducing HTTP requests and improving website performance.

## 🎯 Features

- **Simple SVG Encoding**: Convert SVG code to CSS-ready `background-image` format
- **URL Loading**: Fetch SVG files directly from URLs
- **SVG Optimization**: Optional minification to reduce file size
- **Quote Style Options**: Choose between single or double quotes for your CSS
- **Live Preview**: See your encoded SVG in action with different backgrounds
- **File Size Statistics**: Track size reduction from optimization
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Automatically adapts to your system preferences

## 🚀 Live Demo

Try the tool right now: [SVG to CSS Encoder](https://yourusername.github.io/svg-to-css-encoder/)

![Demo Screenshot](docs/images/screenshot.png)

## 💻 Usage

1. Paste your SVG code into the left input area
2. Alternatively, load an SVG from a URL
3. The encoded SVG and CSS code will appear automatically
4. Use the "Copy" buttons to copy the results to your clipboard
5. Toggle background colors to check how your SVG looks on different backgrounds

### Advanced Options

- **Minify SVG**: Enable/disable SVG optimization
- **Quote Style**: Choose between single (`'`) and double (`"`) quotes to match your coding style

## 📱 Installation

No installation required! This is a standalone web app that runs entirely in your browser. Simply clone the repository and open the `index.html` file in your web browser.

```bash
git clone https://github.com/yourusername/svg-to-css-encoder.git
cd svg-to-css-encoder
# Open index.html in your browser
```

## 🛠️ Integration with Build Tools

For automated workflows, the core encoding function can be extracted and used in build tools:

```javascript
function encodeSVG(svg) {
  // Add namespace if it doesn't exist
  if (svg.indexOf('http://www.w3.org/2000/svg') < 0) {
    svg = svg.replace(/<svg/g, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  
  // Use single quotes instead of double to avoid encoding
  svg = svg.replace(/"/g, "'");
  
  // Compress
  svg = svg.replace(/>\s{1,}</g, "><");
  svg = svg.replace(/\s{2,}/g, " ");
  
  // Encode unsafe characters
  svg = svg.replace(/[\r\n%#()<>?\[\\\]^`{|}]/g, encodeURIComponent);
  
  return svg;
}
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Ideas

- Add file upload support
- Implement more advanced SVG optimization options
- Add batch processing for multiple SVGs
- Create custom CSS output formats (SVG masks, filters, etc.)
- Add ability to save user preferences

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Inspired by the need for efficient SVG embedding in CSS
- Special thanks to all contributors and users who provided feedback

---

Made with ❤️ by [Christopher Robison](https://github.com/chrisrobison)
