import styled from 'styled-components';

const Button = styled.div`
    cursor: pointer;
    display: block;
    text-align: center;
    background-position: center;
    transition: background 1.2s;
    &:active {
        background-color: #6eb9f7;
        background-size: 100%;
        transition: background 0s;
    }
`;

const BaseToolbarButton = styled(Button)`
    -webkit-flex-shrink: 0;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    font-size: 1.4rem;
    height: 2.4rem;
    line-height: 2.4rem;
    width: 2.2rem;
    & > * {
        vertical-align: text-bottom;
    }

    color: ${({theme, active}) => {
        return active ? theme.btnActiveColor : theme.color || 'white'
    }};
    
    &[disabled]:hover, &[disabled] {
        color: #666;
    }
    
    &:not(:hover) ~ div, &[disabled]:hover ~ div {
        display: none;
    }

    & ~ div:hover {
        display: block;
    }

`

export default BaseToolbarButton;