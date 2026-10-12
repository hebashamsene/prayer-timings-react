import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Prayer from './Prayer';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import moment from "moment";
import { useState ,useEffect} from 'react';
// import "moment/locale/ar-as";
import "moment/locale/ar-dz";
 moment.locale("ar-dz");

export default  function MainContent(){

        
       
       // STATES
      const [timings,setTimings]=useState({
        "Fajr": "04:33",
        "Dhuhr": "11:32",
        "Asr": "14:57",
        "Maghrib": "17:30",
        "Isha": "19:00",
      });

      const [remainingTime, setRemainingTime] = useState("");

      const [selectedCity,setSelectedCity]=useState({
        disPlayName:"مكة المكرمة",
        apiName:"Makka al Mukarramah",
      });
     
      const [today,setToday]=useState("");
      const[nextPrayerIndex,setNextPrayerIndex]=useState(0);

      const prayersArray=[
        {key:"Fajr",disPlayName:"الفجر"},
        {key:"Dhuhr",disPlayName:"الظهر"},
        {key:"Asr",disPlayName:"العصر"},
        {key:"Maghrib",disPlayName:"المغرب"},
        {key:"Isha",disPlayName:"العشاء"},
      ]

      const avilableCities=[
        {
        disPlayName:"مكة المكرمة",
        apiName:"Makka al Mukarramah",
        },
        {
        disPlayName:"الرياض",
        apiName:"Riyadh",
        },
        {
        disPlayName:"سوريا",
        apiName:"ٍSyria",
        }
      ]
      
   
     const getTimings= async ()=>{
      const response=await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?country=SY&city=${selectedCity.apiName}`
      );
      setTimings(response.data.data.timings);
     }

     const setupCountdownTimer=()=>{
      // تحديد الوقت الحالي
      const momentNow=moment();
      // ـحديد الصلاة القادمة
      let PrayerIndex=2;
      if(momentNow.isAfter(moment(timings["Fajr"],"hh:mm")) && momentNow.isBefore(moment(timings["Dhuhr"],"hh:mm"))){
        // console.log("Dhuhr");
        PrayerIndex=1;
      }else if(momentNow.isAfter(moment(timings["Dhuhr"],"hh:mm")) && momentNow.isBefore(moment(timings["Asr"],"hh:mm"))){
        //  console.log("Asr");
         PrayerIndex=2;
      }else if(momentNow.isAfter(moment(timings["Asr"],"hh:mm")) && momentNow.isBefore(moment(timings["Maghrib"],"hh:mm"))){
        //  console.log("Maghrib");
         PrayerIndex=3;
      }else if(momentNow.isAfter(moment(timings["Maghrib"],"hh:mm")) && momentNow.isBefore(moment(timings["Isha"],"hh:mm"))){
        //  console.log("Isha");
         PrayerIndex=4;
      }else{
         PrayerIndex=0;
      }
        setNextPrayerIndex(PrayerIndex);
        const nextPrayerObject = prayersArray[PrayerIndex];
        const nextPrayerTimer = timings[nextPrayerObject.key];
        let remainingTime = moment(nextPrayerTimer,"hh:mm").diff(momentNow);
        const nextPrayerTimeMoment = moment(nextPrayerIndex,"hh:mm");

        if(remainingTime<0){
          const midnightDiff = moment("23:59:59","hh:mm:ss").diff(momentNow);
          const fajirToMidnightDiff = nextPrayerTimeMoment.diff(moment("23:59:59","hh:mm:ss"));

          const totalDiff = midnightDiff + fajirToMidnightDiff ;
          remainingTime = totalDiff;
        }
         

         const durationRemainingTime = moment.duration(remainingTime);
            setRemainingTime(`${
              durationRemainingTime.seconds()
            }:${durationRemainingTime.minutes()}:${durationRemainingTime.hours()}`);

     }

     useEffect(()=>{
       getTimings();
       const t = moment();
       const formattedDate = t.format("MMMM Do YYYY | hh:mm:ss a");
        setToday(formattedDate);
      // console.log(t, t.format("hh:mm"));
        
     },[selectedCity]);
      // من شان الوقت المتبقي
     useEffect(()=>{
           let interval= setInterval(() => {
              setupCountdownTimer();
             }, 1000);
           return ()=>{
            clearInterval(interval)
           }
       },[timings]);

    const handleCityChange = (event) => {
      const cityObject=avilableCities.find((city)=>{
        return city.apiName == event.target.value
      })
      console.log(event.target.value);
      setSelectedCity(cityObject);

  };
    return(
        <>
        {/* top row */}
          <Grid container style={{
                            display:"flex",
                            width:"100vw",
                            alignItems:"center",
                            justifyContent:"center",
                            margin:"30px",
                            padding:"10px"
                            }}>
               <Grid xs={6} style={{
                              margin:"10px",
                              position:"relative",
                              top:"55px",
                              left:"90px"
                            }}>
                 <div>
                    <h2>{today}</h2>
                    <h1>{selectedCity.disPlayName}</h1>
                 </div>
               </Grid>

               <Grid xs={6} style={{
                              margin:"10px",
                              position:"relative",
                              top:"55px"
                              }}>
                 <div>

                 <h2 className='pulse' >باقي حتى صلاة {prayersArray[nextPrayerIndex]?.disPlayName}</h2>
                    <h1 className='pulse'>{remainingTime}</h1>
                 </div>
               </Grid>
          </Grid>
          {/* === top row=== */}
          <Divider style={{borderColor:"white",opacity:"0.1"}}/>
          {/* prayers cards */}
          <Stack direction="row"  style={{justifyContent:"space-around",marginTop:"50px",backgroundColor:"#c9a227"}}>
            <Prayer name="الفجر" time={timings.Fajr} img="../src/assets/one.jpg"/>
            <Prayer name="الظهر" time={timings.Dhuhr} img="../src/assets/two.jpg"/>
            <Prayer name="العصر" time={timings.Asr} img="../src/assets/three.jpg"/>
            <Prayer name="المغرب" time={timings.Maghrib} img="../src/assets/four.jpg"/>
            <Prayer name="العشاء" time={timings.Isha} img="../src/assets/five.jpg"/>
          </Stack>
           {/* === prayers cards === */}
           {/* select city */}
           <Stack direction="row" style={{justifyContent:"center",marginTop:"10px"}}>
                <FormControl style={{width:"20%"}}>
                  <InputLabel id="demo-simple-select-label">
                        <span style={{color:"white"}}>
                          المدينة
                        </span>
                  </InputLabel>
                  <Select
                    style={{color:"white"}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Age"
                    onChange={handleCityChange}
                  >
                    {avilableCities.map((city)=>{
                       return <MenuItem key={city.apiName} value={city.apiName}>{city.disPlayName}</MenuItem>
                    })}
                  </Select>
                </FormControl>
           </Stack>
        </>
    )
}
