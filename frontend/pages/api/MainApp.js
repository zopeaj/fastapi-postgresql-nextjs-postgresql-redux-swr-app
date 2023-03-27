import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import styled from 'styled-components'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import { ThirdWebSDK } from '@3rdweb/sdk'
import { ethers } from 'ethers'

const sdk = new ThirdWebSDK(
    new ethers.Wallet(
        process.env.NEXT_PUBLIC_METAMASK_KEY,
        ethers.getDefaultProvider(
            'https://rinkeby.infura.io/v3/laskdaslksadjklasd92930993alksd'
        )
    )
)


const Dashboard = ({ address }) => {
    const [sanityTokens, setSanityTokens] = useState([])
    const [thridWebTokens, setThirdWebTokens] = useState([])
    useEffect(() => {
        const getSanityAndThirdWebTokens = async () => {
            const coins = await fetch("https://gwkherug.api.sanity.io/v1/data/query/production?query=")

            const tempSanityTokens = (await coins.json()).result
            setSanityTokens(tempSanityTokens)

            setThirdWebTokens(
                sanityTokens.map(token => sdk.getTokenModule(token.contractAddress))
            )

        }
        return getSanityAndThirdWebTokens()
    }, [])

    // console.log('Sanity', sanityTokens)
    // console.log('Thirdweb', thridWebTokens)

    return (
        <Wrapper>
            <Sidebar />
            <MainContainer>
                <Header
                    walletAddress={address}
                    sanityTokens={sanityTokens}
                    thirWebTokens={thridWebTokens}
                />
                <Main
                    walletAddress={address}
                    sanityTokens={sanityTokens}
                    thirWebTokens={thridWebTokens}
                />
            </MainContainer>
        </Wrapper>
    )
}

export default Dashboard

const Wrapper = styled.div`
 display:flex;
 height:100vh;
 width:100vw;
 bakcground-color:$0a0b0d;
 color:white;
`

const MainContainer = styled.div`
  flex:1;
`


