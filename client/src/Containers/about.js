import React from 'react'

import '../Styles/about.css'

const ProfilePic = props => (
    <div className='profile-pic-entry'>
      <div className={`profile-pic ${props.name}`}>
      </div>

      <span>{props.name}</span>
    </div>
)

export default () => (
  <div id="about-us">
    <div className="row start-xs">
      <div id="left-pane" className="col-xs-9">
        <h1>About SendSomeDai</h1>

        <p>
          Sometimes you just need to send your mom some money. <br/>
          But mom doesn't know crypto!
        </p>

        <p>
          SendSomeDai has a simple mission: <br/>
          use stable coins to send fiat accross borders in <br/>
          an easy and straight-forward way.
        </p>
      </div>
      <div className="col-xs-3">
        <h1>Contact Us</h1>
        <p>
          <a href="mailto:contact@sendsomedai.com">contact@sendsomedai.com</a>
        </p>
      </div>
    </div>

    <div className="row">
      <div id="team-grid">
        <div id="profile-pic-wrap">
          <ProfilePic name="amhed" />
          <ProfilePic name="ed" />
          <ProfilePic name="andy" />
        </div>
      </div>
    </div>
  </div>
)