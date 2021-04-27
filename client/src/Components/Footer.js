import React, { Component } from 'react';

class Footer extends Component {
  render() {

    if(this.props.data){
      var networks= this.props.data.social.map(function(network){
        return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      })
    }

    return (
      <footer>

     <div className="row">
        <div className="twelve columns">
           <ul className="social-links">
              {networks}
           </ul>

           <ul className="copyright">
              <li>&copy; Copyright 2017 <a target="_blank" rel="noreferrer" href='https://github.com/tbakerx/react-resume-template'>Tim Baker</a></li>
              <li>Design by <a title="Styleshout" target="_blank" rel="noreferrer" href="http://www.styleshout.com/">Styleshout</a></li>
              <li>See my <a target="_blank" rel="noreferrer" href='https://github.com/Gobsmack90/portfolio'>additions</a> to the template.</li>
           </ul>

        </div>
        <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
     </div>
  </footer>
    );
  }
}

export default Footer;
