import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
// import CardActionArea from '@mui/material/CardActionArea';

export default function Prayer({name,time,img}){
        

    
    return(
        <>
          <Card className='cardStyle' sx={{ maxWidth: 200 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="100"
                image={img}
                
            />
            <CardContent>
                <Typography className="MyStyle" gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="h3" sx={{ color: 'text.secondary' }}>
                   {time}
                </Typography>
            </CardContent>
          </Card>
        </>
    )
}