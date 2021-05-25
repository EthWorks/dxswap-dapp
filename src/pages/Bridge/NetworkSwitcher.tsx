import React from 'react'
import styled from 'styled-components';
import { ButtonPrimary } from '../../components/Button';
import { RowBetween } from '../../components/Row';
import { transparentize } from 'polished'

interface NetworkSwitcherProps {
  isEthereumConnected: boolean;
  onSwitchClick: () => void;
  onCollectClick: () => void;
}

export const NetworkSwitcher = ({isEthereumConnected, onSwitchClick, onCollectClick}: NetworkSwitcherProps) => {
  const isActiveClassName = isEthereumConnected ? 'active' : '';
  
  return (
    <>
      <RowBetween mt="22px">
        <SwitchButton
          onClick={onSwitchClick}
          disabled={isEthereumConnected}
        >
          Switch to ethereum
        </SwitchButton>
        <CollectButton
          onClick={onCollectClick}
          disabled={!isEthereumConnected}
        >
          Collect
        </CollectButton>
      </RowBetween>
      <Row className={isActiveClassName}>
        <Number className={isActiveClassName}>1</Number>
        <Number>2</Number>
      </Row>
    </>
  )
}

const SwitchButton = styled(ButtonPrimary)`
  height: 58px;

  &:disabled {
    background: rgba(14, 159, 110, 0.2);
    color: ${({theme}) => transparentize(0.6, theme.green2)};
  }
`;

const CollectButton = styled(ButtonPrimary)`
  height: 58px;
  margin-left: 16px;

  &:disabled {
    background-color: ${({ theme }) => theme.primary1};
    color: ${({ theme }) => theme.white};
    opacity: 0.3;
  }
`;

const Row = styled(RowBetween)`
  position: relative;
  max-width: 247px;
  margin: 24px auto 10px;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    transform: translateY(-50%);
    background: linear-gradient(-90deg, #2E17F2 -3.41%, rgba(46, 23, 242, 0.2) 29.26%, rgba(46, 23, 242, 0.6) 29.26%);
    z-index: -1;
  }

  &.active::before {
    background: linear-gradient(90deg, #0E9F6E 0.85%, #2E17F2 101.42%);
  }
`;


const Number = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 22px;
  width: 22px;
  background-color: ${({ theme }) => theme.primary1};
  border-radius: 50%;
  color: ${({ theme }) => theme.white};
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;

  &.active {
    background: #163430;
  }
`;


