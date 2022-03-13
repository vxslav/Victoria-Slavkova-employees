import { useState } from 'react';
import CSVReader from 'react-csv-reader';
import Datagrid from './Datagrid';
import { checkOverlap } from './util';
import styled from 'styled-components';

function App() {

  //keep finalized data as state to pass to table
  const [result, setResult] = useState([]);
  /* format csv file into an array of objects and find the longest time 2 employees 
    have worked on the same project at the same time, set the state to the resulted data */
  const handleCSV = (data) => {
    const headers = data[0];
    const dataArray = [];
    const teams = [];
    const pairs = [];
    for (let i = 1; i < data.length; i++) {
      const obj = {}
      obj[headers[0]] = data[i][0]
      obj[headers[1]] = data[i][1]
      obj[headers[2]] = data[i][2]
      obj[headers[3]] = data[i][3]
      dataArray.push(obj);
    }
    const projectIDs = new Set(dataArray.map(item => item.ProjectID)); //unique project ids
    projectIDs.forEach(project => {
      teams.push(dataArray.filter(obj => obj.ProjectID === project))
    })
    const projectsWithMoreEmployees = teams.filter(item => item.length > 1)
    projectsWithMoreEmployees.map(item => {
      item.pairs(pair => {
        let days = checkOverlap(pair[0].DateFrom, pair[0].DateTo, pair[1].DateFrom, pair[1].DateTo);
        if (days > 0) {
          pairs.push({
            projectDays: days,
            projectID: pair[0].ProjectID,
            firstE: pair[0].EmpID,
            secondE: pair[1].EmpID,
            totalDaysTogether: 0 //defaults to zero, will be accumulated later
          })
        }
      })
    })
    pairs.map(outer => {
      outer.totalDaysTogether = pairs.filter(inner =>
        outer.firstE == inner.firstE && outer.secondE == inner.secondE).reduce((prev, curr) => {
          return prev + curr.projectDays
        }, 0)
    })

    let largest = pairs.sort((el1, el2) => el2.totalDaysTogether - el1.totalDaysTogether)[0];
    let final = pairs.filter(e =>
      e.totalDaysTogether == largest.totalDaysTogether &&
      e.firstE == largest.firstE &&
      e.secondE == largest.secondE) //to make sure we don't have the same totals for diff employee pairs
    setResult(final)
  }
  return (
    <StyledPage>
      <Heading>Choose a file in order to identify the pair of employees who have worked
          together on common projects for the longest period of time and see their common projects below
      </Heading>
      <CSVReader onFileLoaded={(data) => handleCSV(data)} /> 

      
        <Datagrid data={result} /> 
      
    </StyledPage>
  );
}

export default App;

const StyledPage = styled.div`
  width: 75%;
  background-color: #e8e8e8;
  margin: 30px auto;
  display: flex;
  flex-direction : column;
  align-items: center;
  justify-content: space-evenly;
  gap: 30px;
  padding: 50px;
  box-shadow: 5px 5px 15px #c3c3c3;
`
const Heading = styled.h3` 
  text-align: center;
  color:  #154f2f;
  margin: 0 auto;
`
