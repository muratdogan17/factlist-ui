import React from 'react'
import { Flex, Box } from '@rebass/grid'
import pickBy from 'lodash/pickBy'
import {
  compose, withUser, withNotification, withFetch, formFetch, withStateHandlers,
} from 'adapters'
import {Layout} from 'components'
import Form from './Form'
import Avatar from './Avatar'
import cm from './settings.module.css'


const SettingsScene = ({setAvatar, handleSubmit, user}) => <Layout>
  <h1 className={cm.title}>Settings</h1>

  <Flex mt={50}>
    <Box mr={40}>
      {user.state.user && <Avatar
        src={user.state.user.avatar}
        onSelect={setAvatar}
      />}
    </Box>

    <Box width={370}>
      <Form
        initialValues={user.state.user}
        onSubmit={handleSubmit}
      />
    </Box>
  </Flex>
</Layout>

export default compose(
  withUser,

  withNotification,

  withFetch(({notification}) => ({
    updateUser: formFetch(params => ({
      updateFetch: ({
        url: '/auth/me',
        method: 'patch',
        body: pickBy(params, Boolean), // remove nulls
        then: () => { notification.show('User updated successfully.') },
        catch: () => {
          notification.show(
            'We couldn\'t update your settings. Please try again later.'
          )
        },
      }),
    })),
  })),

  withStateHandlers({
    avatar: null,
  }, {
    setAvatar: () => avatar => ({avatar}),

    handleSubmit: (state, props) => (values, ...rest) =>
      props.updateUser(
        {
          ...values,
          avatar: state.avatar,
        },
        ...rest
      )
  }),
)(
  SettingsScene
)
