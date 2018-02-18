import React, { Component } from 'react'
import Claim from '../../components/Claim'
import { Flex, Box } from 'grid-styled'
import Topics from '../../components/Topics'
import Footer from '../../components/Footer'
import LeftBox from './LeftBox'
import CenterBox from './CenterBox'
import RightBox from './RightBox'
import Evidence from '../../components/Evidence'
import EvidenceForm from '../../components/EvidenceForm'
import Slack from '../../components/Slack'
import Header from '../../components/Header'

import { connect } from 'react-redux'
import { compose } from 'redux'
import injectReducer from '../../utils/injectReducer'
import injectSaga from '../../utils/injectSaga'
import reducer from './reducer'
import saga from './saga'
import { fetchClaims } from './actions'

import ContentLoader, { List } from 'react-content-loader'

class MainPage extends Component {
  componentDidMount() {
    this.props.fetchClaims()
  }

  render() {
    const { claims } = this.props

    return (
      <div>
        <Header user={this.props.user} />
        <Flex justify="center" wrap>
          <LeftBox>
            <Topics title="POPULAR TOPICS" />
          </LeftBox>

          <CenterBox>
            {claims.map((claim) =>
              <Box mb={30} key={'claim_' + claim.id}>
                <Claim claim={claim} />
              </Box>
            )}

            <Box mg={30}>
              <EvidenceForm />
            </Box>
          </CenterBox>

          <RightBox>
            <Box>
              <Slack />
            </Box>
            <Box mt={15}>
              <Footer />
            </Box>
          </RightBox>
        </Flex>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.global.user,
  claims: state.claims.data
})

const mapDispatchToProps = (dispatch) => ({
  fetchClaims: () => dispatch(fetchClaims())
})

const withConnect = connect(mapStateToProps, mapDispatchToProps)
const withReducer = injectReducer({ key: 'claims', reducer })
const withSaga = injectSaga({ key: 'claims', saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(MainPage)
