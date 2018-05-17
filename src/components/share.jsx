import React from "react"
import PropTypes from "prop-types"

import Contact from "./contact"

export default class Share extends React.PureComponent {
  static propTypes = {
    authors: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isOptional
      })
    ),
    contacts: PropTypes.objectOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isOptional
      })
    ),
    notifications: PropTypes.objectOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        sender: PropTypes.object.isRequired,
        board: PropTypes.object.isRequired
      })
    )
  }

  static defaultProps = {
    authors: {},
    contacts: {},
    notifications: {}
  }

  constructor() {
    super()

    this.state = { tab: 'notifications' }
  }

  renderContacts() {
    const authors = Object.keys(this.props.authors).map(id => {
      const author = this.props.authors[id]
      return <Contact key={id} name={author.name} avatar={author.avatar} actions={["unshare"]} />
    })

    const contacts = Object.keys(this.props.contacts).map(id => {
      const contact = this.props.contacts[id]
      return <Contact key={id} name={contact.name} avatar={contact.avatar} actions={["share"]} />
    })

    return (
      <div>
        <h6>On Board</h6>
        <div className='Share__section'>
          <div className='Share__authors'> 
            { authors } 
          </div>
        </div>

        <h6>All</h6>
        <div className='Share__section'>
          <div className='Share__contacts'> 
            { contacts } 
          </div>
        </div>
      </div>
    )
  }

  renderNotifications() {
    const notifications = Object.keys(this.props.notifications).map(id => {
      const notification = this.props.notifications[id]

      return (
        <div key={id} className='Notification'>
          <p>You received...</p>
          <h4>{ notification.board.title }</h4>
          <p>From { notification.sender.name }</p>

          <div className='Notification__actions'>
            <div className='Notification__actions__view'>
              <i className='fa fa-arrow-right' /> View
            </div>
            <div className='Notification__actions__archive'>
              <i className='fa fa-archive' /> Archive
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className='Share__notifications'>
        { notifications }
      </div>
    )
  }

  tabClasses(name) {
    if(this.state.tab === name)
      return 'Share__tabs__tab Share__tabs__tab--active'
    else
      return 'Share__tabs__tab'
  }

  render() {
    let body

    if(this.state.tab === 'contacts')
      body = this.renderContacts()
    else if(this.state.tab === 'notifications')
      body = this.renderNotifications()

    return (
      <div className='Share'>
        <div className='Share__tabs'>
          <div 
            className={this.tabClasses('contacts')}
            onClick={() => this.setState({ tab: 'contacts' })}
          >
            <i className='fa fa-group' /> Contacts
          </div>
          <div 
            className={this.tabClasses('notifications')}
            onClick={() => this.setState({ tab: 'notifications' })}
          >
            Notifications
          </div>
        </div>

        { body }
      </div>
    )
  }
}
