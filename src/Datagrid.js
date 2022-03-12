import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

export default function Datagrid(props) {
   
    let projects = props.data;
    let headers = ['Employee ID #1', 'Employee ID #2', 'Project ID', 'Days worked']
    return(
        <Table>
            <Headers>
                <tr key='headers'>
                     {headers.map(header => <Data key={header}>{header}</Data>)}
                </tr>
              
            </Headers>
            <tbody>
                {
                projects.map(item => {
                    return (
                        <Row key={uuidv4()}>
                            <Data key={uuidv4()}>{item.firstE}</Data>
                            <Data key={uuidv4()}>{item.secondE}</Data>
                            <Data key={uuidv4()}>{item.projectID}</Data>
                            <Data key={uuidv4()}>{item.projectDays}</Data>
                        </Row>
                    )
                })
                }
               
            </tbody>
        </Table>
    )
}

const Table = styled.table`
    border: 1px solid #154f2f;
    padding: 20px;
    margin: 0 auto;
`
const Headers = styled.thead`
    background-color : #154f2f;
    color: #fff;
    padding: 10px;
    font-weight: 600;
`
const Data = styled.td`
    padding: 10px;
    text-align: center;
`
const Row = styled.tr` 
    padding: 10px;
    background-color: #f3ff56;
`