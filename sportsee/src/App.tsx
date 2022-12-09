import React, { useEffect, useState } from 'react';
import './App.css';
import { useQuery } from 'react-query'
import GoalChart from './components/GoalChart/GoalChart';
import SessionChart from './components/SessionChart/SessionChart';
import ActivityChart from './components/ActivityChart/ActivityChart';
import DailyCard from './components/DailyCard/DailyCard';
import fire from '../src/assets/img/fire.svg'
import apple from '../src/assets/img/apple.svg'
import cheeseburger from '../src/assets/img/cheeseburger.svg'
import chicken from '../src/assets/img/chicken.svg'
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import SpiderChart from './components/SpiderChart/SpiderChart';
import API from './services/API'
import Error from './Error';

function App() {
  const { data: scoreData } = useQuery<any>('score', API.getScoreData)
  const { data: sessionData } = useQuery<any>('session', API.getSessionData)
  const { data: activityData } = useQuery<any>('activity', API.getActivityData)
  const { data: perfDataKind } = useQuery<any>('performance', API.getPerfData)

  let { isLoading, data, isError } = useQuery<any>('user', API.getUser)

  if (isError) {

    return (<Error />)
  }

  if (isLoading) { return <h1>Loading...</h1> } else {
    return (
      <div className="App">
        <Navbar />
        <Sidebar />

        <main className="row">
          <h1 className="title"> Bonjour <span>{data.data.userInfos.firstName}</span> </h1>
          <p className="subtitle">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
          <div className='data_block'>
            <div className="data_block__left">
              <ActivityChart activity={activityData} />
              <div className="data_block__left__bottom">
                <SessionChart sessions={sessionData} />
                <SpiderChart perfData={perfDataKind} />
                <GoalChart score={scoreData} />


              </div>
            </div>
            <div className="data_block__right">
              <DailyCard title={data.data.keyData.calorieCount + "Kcal"} subtitle={"Calories"} icon={fire} bg="red" />
              <DailyCard title={data.data.keyData.proteinCount + "g"} subtitle={"Proteines"} icon={chicken} bg="blue" />
              <DailyCard title={data.data.keyData.carbohydrateCount + "g"} subtitle={"Glucides"} icon={apple} bg="yellow" />
              <DailyCard title={data.data.keyData.lipidCount + "g"} subtitle={"Lipides"} icon={cheeseburger} bg="pink" />
            </div>


          </div>


        </main>


      </div>
    );
  }


}


export default App;

