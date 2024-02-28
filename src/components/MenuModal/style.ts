import styled from "styled-components";

export const MenuContainer = styled.div`
    position: fixed;
    z-index: 2;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0,0 , .5);
`;

export const MenuBox = styled.div`
    width: 80%;
    height: 100%;
    position: fixed;
    right: 25%;
    left: 25%;
    max-width: 425px;
    margin: 0 auto;
    background-color: #E9E9E9;
`;

export const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 20px;
`;

export const MenuItem = styled.div`
    border-radius: 8px;
    padding: 10px 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #D9D9D9;
`;