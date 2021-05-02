import React, { Component } from 'react';
import './Portfolio.scss'

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: null,
    };
    this.setOpen = this.setOpen.bind(this);
    this.openItem = this.openItem.bind(this);
  }

  setOpen(value) {
    this.setState({
      open: value
    })
  }

  openItem(project) {
    let projectImage = 'images/portfolio/'+project.image;

    return (
      <div className='openItem' >
        <h2 className='openItem-title' >{project.title}</h2>
        <p className='openItem-subtitle'>{project.category}</p>
        <div className='openItem-close' onClick={() => this.setOpen(null)}><i className="fa fa-times"></i></div>
        <img className='openItem-image' alt={project.title} src={projectImage} />
        <div className='openItem-navButtons'>
          <a target="_blank" rel="noreferrer" className='openItem-url' href={project.url}><i className="fa fa-globe"></i> Link</a>
          <a target="_blank" rel="noreferrer" className='openItem-github' href={project.github}><i className="fa fa-github"></i> Github</a>
        </div>
        <p className='openItem-details' >{project.details}</p>
      </div>
    )
  }

  render() {

    if(this.props.data){
      var projects = this.props.data.projects.map((projects, index) => {
        if (this.state.open === index) {
          return this.openItem(projects)
        }

        var projectImage = 'images/portfolio/'+projects.image;
        return (
          <div key={projects.title} className="columns portfolio-item">
            <div className="item-wrap">
              <div onClick={() => this.setOpen(index)}>
                <img alt={projects.title} src={projectImage} />
                <div className="overlay">
                    <div className="portfolio-item-meta">
                  <h5>{projects.title}</h5>
                      <p>{projects.category}</p>
                    </div>
                  </div>
                <div className="link-icon"><i className="fa fa-expand"></i></div>
              </div>
            </div>
          </div>
        )
      })
    }

    return (
      <section id="portfolio">

      <div className="row">

         <div className="twelve columns collapsed">

            <h1>Check Out Some of My Works.</h1>
            <h2>Click on the images below to learn more.</h2>

            <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
            </div>
          </div>
      </div>
   </section>
    );
  }
}

export default Portfolio;
