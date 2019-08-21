import styled from 'styled-components';

const BaseToolbar = styled.div`
    background: #222;
    color: white;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    min-height: min-content;

    & > * {
        display: inline-block!important;
    }
    & > * + * {
        margin-right: 5px;
    }
`

export default BaseToolbar;