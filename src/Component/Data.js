import React from 'react'
import {useState,useEffect} from 'react'
import {Table,TableBody,TableHead,TableRow,TableCell,Paper,Button,Grid} from "@material-ui/core"
import { TableContainer,Box,TextField } from '@material-ui/core';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';



function Data() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [search,setSearch]= useState('')
    const [order,setOrder] =useState("ASC")
    const sorting =(col)=>{
        if(order==="ASC"){
            const sorted=[...items].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase()?1:-1
            )
            setItems(sorted)
            setOrder("DSC")
        }
        if(order==="DSC"){
            const sorted=[...items].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase()?1:-1
            )
            setItems(sorted)
            setOrder("ASC")
        }
    }
   
    useEffect(() => {
      fetch("https://my-json-server.typicode.com/Ved-X/assignment/orders")
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result)
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  const searchHandler=(event)=>{
    setSearch(event.target.value)
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else { 
    return (
      <Box>
          <Grid container className='Search'>
          <Grid xs={5} sx={{alignItem:"left"}}>
          <TextField
          onChange={searchHandler}
          variant="outlined"
          fullWidth
          icons={<SearchIcon alignItem="right"/>}
          placeholder='Search'
          InputProps={{
            endAdornment: (
              
                  <SearchIcon />
            )
          }}
          
        />
        
          </Grid>
          <Grid sx ={6} >
            <Button variant='outlined' sx={{marginRight:"100px"}}>Filter<FilterListIcon/></Button>
            
          </Grid>
          </Grid>

          
    <TableContainer component={Paper}>
        
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell >Order ID</TableCell>
            <TableCell >Customer</TableCell>
            <TableCell >Address</TableCell>
            <TableCell >Product</TableCell>
            <TableCell onClick={()=>sorting("date")} >Date Order {<ArrowDownwardIcon />}</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            
          { items.filter((data) => {
                    return (data.customer.toLowerCase().includes(search.toLowerCase()))
                }).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.order_id}
              </TableCell>
              <TableCell >{row.customer}</TableCell>
              <TableCell >{row.address}</TableCell>
              <TableCell>{row.product_title}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell >{row.status}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
    </TableContainer>
    </Box>

      )  
                }
}

export default Data