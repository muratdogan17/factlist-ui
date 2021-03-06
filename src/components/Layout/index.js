import React from 'react'
import {compose, withUser, withModal} from 'adapters'
import {Header} from 'components'
import cm from './layout.module.css'


const Layout = ({user, modal, children}) => <>
  <Header
      user={user.state.user}
      token={user.state.token}
      onClickSignInButton={() => modal.show('SignIn')}
  />

  <div className={cm.container}>
    {children}
  </div>
</>

export default compose(
  withUser,
  withModal
)(
  Layout
)
