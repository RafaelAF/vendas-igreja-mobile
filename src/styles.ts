import styled from "styled-components";

export const ContainerApp = styled.div`
    background-color: #333;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`;

export const BlocoApp = styled.div`
    max-width: 425px;
    width: 100%;
    background-color: #d9d9d9;
    display: flex;
    /* background-color: red; */
    flex-direction: column;
    height: 100%;
`;

export const HeaderContainer = styled.div`
    height: 57px;
    /* width: 100%; */
    /* background-color: red; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
`;

export const Title = styled.h1`
    color: #000;
    text-align: start;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;
export const Title2 = styled(Title)`
    margin: 14px 10px;
`;

export const Text = styled.p`
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
`;

export const Container = styled.div`
    background-color: #fff;
    height: calc(100vh - 57px);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ListContainer = styled.div`
    border-radius: 8px;
    background: rgba(117, 98, 203, 0.20);
    position: relative;
    display: flex;
    flex-direction: column;
    /* gap: 10px; */
    width: 97%;
    height: 97%;
`;

export const ListContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: auto;
    max-height: calc(100vh - 200px);
    position: relative;
`;

type ListItemStatusProps = {
    status?: 'ATIVO' | 'INATIVO';
}

export const ListProducts = styled(ListContent)<ListItemStatusProps>`
    &::after{
        content: '';
        right: 5px;
        bottom: 50%;
        transform: translateY(50%);
        position: absolute;
        background-color: #f00;
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 50%;
    }
`

export const TableContainer = styled(ListContent)`
    background-color: #eee;
    overflow: auto;
    border-radius: 8px;
    height: 100%;
    width: 95%;
    margin: 0 auto;
    table{
        /* border: 1px solid #000; */
        width: 500px;
        border-collapse: collapse;
        thead{
            tr{
                background-color: #999;
                th{
                    color: #fff;
                }
            }
        }
        tbody{
            tr{
                td{
                    text-align: center;
                    color: #000;
                    div{
                        display: flex;
                        gap: 5px;
                        span::after{
                            content: ",";
                        }
                    }
                }
            }
        }
    }
`;


export const ListItem = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: rgba(117, 90, 203, 0.05);
    color: #000;
    margin: 0 10px;
    padding: 13px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ControlsContainer = styled.div`
    display: flex;
`;

export const ButtonsContainer = styled.div`
    margin-left: 5px;
    display: flex;
    button{
        width: 23px;
        height: 23px;
        background-color: rgba(41, 32, 71, 0.50);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        padding: 5px;
        color: #fff;
        &:first-child{
            margin-right: 5px;
        }
        &:last-child{
            margin-left: 5px;
        }
    }
`;

export const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(117, 98, 203, 0.20); 
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    /* width: 100%; */
    display: flex;
    justify-content: space-between;
    padding: 12px 15px;
`;

export const ButtonConfirm = styled.button`
    border-radius: 8px;
    background: #18BA53; 
    color: #FFF;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;


export const ModalContainer = styled.div`
    position: fixed;
    z-index: 3;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0,0 , .5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Modal = styled.div`
    background-color: #fff;
    width: 90%;
    height: 95%;
    max-width: 425px;
    border-radius: 8px;
    position: relative;
`;

export const MiniModal = styled(Modal)`
    height: 410px;
    top: -80px;
    max-width: 350px;
    /* transition: 300ms linear; */
`;