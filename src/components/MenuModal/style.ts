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
    background-color: #00005C;
`;

export const MenuList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 20px;
`;

export const MenuItem = styled.div`
    border-radius: 8px;
    padding: 15px 21px;
    max-height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1C0E8A;
`;

export const MenuText = styled.p`
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0;
    text-align: center ;
`;