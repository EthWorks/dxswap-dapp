import { ChainId, Currency, Token, DXD, Fetcher } from 'dxswap-sdk'
import React, { useMemo } from 'react'
import styled from 'styled-components'

import EthereumLogo from '../../assets/images/ethereum-logo.png'
import PoaLogo from '../../assets/images/poa-logo.png'
import XDAILogo from '../../assets/images/xdai-logo.png'
import DXDLogo from '../../assets/svg/dxd.svg'
import { useActiveWeb3React } from '../../hooks'
import useHttpLocations from '../../hooks/useHttpLocations'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import Logo from '../Logo'

const getTokenLogoURL = (address: string) =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const NATIVE_CURRENCY_LOGO: { [chainId in ChainId]: string } = {
  [ChainId.ARBITRUM_TESTNET_V3]: EthereumLogo,
  [ChainId.MAINNET]: EthereumLogo,
  [ChainId.RINKEBY]: EthereumLogo,
  [ChainId.SOKOL]: PoaLogo,
  [ChainId.XDAI]: XDAILogo
}

export default function CurrencyLogo({
  currency,
  size = '24px',
  style,
  className
}: {
  currency?: Currency
  size?: string
  style?: React.CSSProperties
  className?: string
}) {
  const { chainId } = useActiveWeb3React()
  const nativeCurrencyLogo = NATIVE_CURRENCY_LOGO[(chainId as ChainId) || ChainId.MAINNET]
  const uriLocations = useHttpLocations(currency instanceof WrappedTokenInfo ? currency.logoURI : undefined)

  const srcs: string[] = useMemo(() => {
    if (currency && Currency.isNative(currency) && !!nativeCurrencyLogo) return [nativeCurrencyLogo]
    if (currency instanceof Token) {
      if (Token.isNativeWrapper(currency)) return [nativeCurrencyLogo]
      if (chainId && DXD[chainId] && DXD[chainId].address === currency.address) return [DXDLogo]
      return [getTokenLogoURL(currency.address), Fetcher.getCachedTokenLogo(currency), ...uriLocations]
    }
    return []
  }, [chainId, currency, nativeCurrencyLogo, uriLocations])

  return (
    <StyledLogo
      className={className}
      size={size}
      srcs={srcs}
      alt={`${currency?.symbol ?? 'token'} logo`}
      style={style}
    />
  )
}
