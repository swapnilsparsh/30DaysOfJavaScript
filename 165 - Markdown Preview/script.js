var Textbox = React.createClass({ displayName: "Textbox",
  markup: function (text) {
    var md = new Remarkable();
    var html = md.render(text.toString());
    return { __html: html };
  },
  loadStringFromTextbox: function () {
    this.setState({ mdText: document.getElementById(this.props.source).value });
  },
  getInitialState: function () {
    return { mdText: "" };
  },
  componentDidMount: function () {
    this.loadStringFromTextbox();
    setInterval(this.loadStringFromTextbox, this.props.interval);
  },
  render: function () {
    return /*#__PURE__*/(
      React.createElement("div", { className: "resultText", dangerouslySetInnerHTML: this.markup(this.state.mdText) }));

  } });


ReactDOM.render( /*#__PURE__*/
React.createElement(Textbox, { source: "textarea", interval: 100 }),
document.getElementById("result"));