import { useSelector, useDispatch } from 'react-redux'
import {useEffect,useState } from 'react'
import { useDemoData } from '@mui/x-data-grid-generator';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import FileBase64 from 'react-file-base64';

import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import {SUCCESS,FAIL,linkFileStore} from '../../config'
import {showErrorMess,showSuccessMess} from '../../lib/util'
import styles from './index.module.scss'


function CustomToolbar({setOpenAddBrand}) {
    return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>

  );
}
function BrandDataGrid() {
  let navigate = useNavigate();
  const [listBrand, setListBrand] = useState([]);
  const [itemClick, setItemClick] = useState({});

  const [openAddBrand, setOpenAddBrand] = useState(false);
  const [openEditBrand, setOpenEditBrand] = useState(false);
  const [openDeleteBrand, setOpenDeleteBrand] = useState(false);
  const [objAddBrandValue, setObjAddBrandValue] = useState({
    name:'',
    image:{},
  })
  const [objAddBrandMess, setObjAddBrandMess] = useState({
    name:'',
    image:'',
  })
  const [objEditBrandValue, setObjEditBrandValue] = useState({
    name:'',
    image:{},
  })
  const [objEditBrandMess, setObjEditBrandMess] = useState({
    name:'',
    image:'',
  })


  let columnsBrand=[
    { field: 'id', headerName: 'ID',flex: 1 },
    { field: 'name', headerName: 'Tên thương hiệu',flex: 1},
    { field: 'image', headerName: 'Hình ảnh',flex: 1,align: "center",headerAlign: 'center',
      renderCell: (params) => {
        return <img  src={params.value} width='60' height='60' />
      }
    },
    { field: '_id', headerName: 'Thao tác',width:120,headerAlign: 'center',disableExport: true,
      renderCell: (params) => {
        return <div style={{display:'flex',justifyContent:'space-evenly',flex:1}}>
          <IconButton
            onClick={()=>clickDeleteBrand(params.row)}
          >
            <DeleteIcon
              color="primary" 
            />
          </IconButton>
          <IconButton
            onClick={()=>clickEditBrand(params.row)}
          >
            <EditIcon
              color="primary"
            />
          </IconButton>
        </div>
      }
    },
  ]
  useEffect(()=>{
    getData()
  },[])
  const getData=()=>{
    let token=localStorage.getItem("token");
    axios.get(`/brands`,{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data,message,type}=res.data
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        // console.log(data)
        data.forEach(item=>item.id=item._id)
        setListBrand(data)
      }
    })
    .catch((error)=> {
      console.log({error})
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }


  const clickAddBrand=()=>{
    setOpenAddBrand(true)
    setObjAddBrandValue({
      name:'',
      image:{},
    })
    setObjAddBrandMess({
      name:'',
      image:'',
    })
  }
  const handleAddBrand=()=>{
    let {name,image}=objAddBrandValue
    name=name.trim()
    setObjAddBrandValue({name,image})
    let messName,messImage
    messName=name==''?'Vui lòng nhập tên':''
    if(image.type&&image.type.includes('image')) messImage=''
      else messImage='Vui lòng chọn ảnh'
    setObjAddBrandMess({
      name:messName,
      image:messImage
    })
    if(messName||messImage) return

    console.log('validate success')
    let data=objAddBrandValue.image.base64.split(',')[1]
    let token=localStorage.getItem("token");
    axios.post(linkFileStore,{data:data})
    .then(res=>{
      // console.log(res)
      let link=res.data.split('>')[1].split('<')[0]
      // console.log(link)

      axios.post(`/brands`,{name,image:link},{
        headers: {
          'x-access-token':token,
        }
      })
      .then(res=>{
        let {data,message,type}=res.data
        if(type==FAIL) showErrorMess(message[0])
        else{ 
          getData()
          showSuccessMess(message[0])
          setOpenAddBrand(false)
        }
      })
      .catch((error)=> {
        let{data,status}=error.response
        if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
        showErrorMess('Xác thực token thất bại')
      });

    })
    .catch(err=>console.log(err))
  }

  const clickEditBrand=(obj)=>{
    setItemClick(obj)
    let {name,image,id}=obj
    setOpenEditBrand(true)
    setObjEditBrandValue({
      name,
      image:{},
    })
    setObjEditBrandMess({
      name:'',
      image:'',
    })

  }
  const handleEditBrand=(obj)=>{
    let {name,image}=objEditBrandValue
    name=name.trim()
    setObjEditBrandValue({name,image})
    let messName,messImage
    messName=name==''?'Vui lòng nhập tên':''
    if(image.type&&image.type.includes('image')) messImage=''
      else messImage='Vui lòng chọn ảnh'
    setObjEditBrandMess({
      name:messName,
      image:messImage
    })
    if(messName||messImage) return

    console.log('validate success')
    let data=objEditBrandValue.image.base64.split(',')[1]
    let token=localStorage.getItem("token");
    axios.post(linkFileStore,{data:data})
    .then(res=>{
      // console.log(res)
      let link=res.data.split('>')[1].split('<')[0]
      // console.log(link)

      axios.patch(`/brands/${itemClick._id}`,{name,image:link},{
        headers: {
          'x-access-token':token,
        }
      })
      .then(res=>{
        let {data,message,type}=res.data
        if(type==FAIL) showErrorMess(message[0])
        else{ 
          getData()
          showSuccessMess(message[0])
          setOpenEditBrand(false)
        }
      })
      .catch((error)=> {
        let{data,status}=error.response
        if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
        showErrorMess('Xác thực token thất bại')
      });

    })
    .catch(err=>console.log(err))
  }


  const clickDeleteBrand=(obj)=>{
    setItemClick(obj)
    let {name,image,id}=obj
    setOpenDeleteBrand(true)
  }
  const handleDeleteBrand=()=>{
    let token=localStorage.getItem("token");
    axios.delete(`/brands/${itemClick.id}`,{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data,message,type}=res.data
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        getData()
        setOpenDeleteBrand(false)
        showSuccessMess(message[0])
      }
    })
    .catch((error)=> {
      console.log({error})
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }


  



  return (
    <div style={{position:'relative'}}>
      <div style={{position:'absolute',right:'12px',top:'8px',zIndex:100000}}>
        <Button variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={clickAddBrand}
          >
            Thêm
        </Button>
      </div>
      <DataGrid
        rows={listBrand}
        columns={columnsBrand}
        rowHeight={80}
        disableSelectionOnClick
        autoHeight
        components={{
          Toolbar: CustomToolbar,
        }}
      />
      {/* add brand */}
      <Modal
        open={openAddBrand}
        onClose={()=>setOpenAddBrand(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal}>
          <div className={styles.form}>
            <div className={styles.title}>Thêm thương hiệu</div>
            <TextField sx={{ width:'300px'}} label="Tên" variant="outlined" value={objAddBrandValue.name} margin="normal"  
              onChange={(event)=>setObjAddBrandValue({...objAddBrandValue,name:event.target.value})}
              error={Boolean(objAddBrandMess.name)}
              helperText={objAddBrandMess.name}
            />
            <div style={{marginTop:20}}>Chọn hình ảnh</div>
            <FileBase64
              multiple={ false }
              onDone={(file)=>setObjAddBrandValue({...objAddBrandValue, image: file})} 
            />
            {/* <div style={{marginTop:10}}></div> */}
            <div style={{color:'#d32f2f',fontSize:12,marginLeft:16}}>{objAddBrandMess.image}</div>
            <img src={objAddBrandValue.image.base64} height={100} width={100} style={{marginTop:10,display:'block'}} className={styles.borderCustom} />
            <div style={{display:'flex',justifyContent:'end',marginTop:'20px'}}>
              <Button variant="text" sx={{width:100}} onClick={()=>setOpenAddBrand(false)} >Hủy</Button>
              <Button variant="contained"  sx={{marginLeft:'20px'}} onClick={handleAddBrand}>Thêm</Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* delete brand */}
      <Dialog
        open={openDeleteBrand}
        onClose={()=>setOpenDeleteBrand(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div style={{minWidth:300}}>
            Xác nhận

          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Xóa thương hiệu {itemClick.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenDeleteBrand(false)}>Hủy</Button>
          <Button onClick={handleDeleteBrand} variant="contained">Xóa</Button>
        </DialogActions>
      </Dialog>
      {/* Edit brand */}
      <Modal
        open={openEditBrand}
        onClose={()=>setOpenEditBrand(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal}>
          <div className={styles.form} style={{display:'flex',flexDirection:'column'}}>
            <div className={styles.title}>Chỉnh sửa thương hiệu {itemClick.name}</div>
            <TextField sx={{ width:'300px'}} label="ID" variant="outlined" defaultValue={itemClick._id} margin="normal"  InputProps={{readOnly: true}} />
            <TextField sx={{ width:'300px'}} label="Tên" variant="outlined" value={objEditBrandValue.name} margin="normal"  
              onChange={(event)=>setObjEditBrandValue({...objEditBrandValue,name:event.target.value})}
              error={Boolean(objEditBrandMess.name)}
              helperText={objEditBrandMess.name}
            />
            <div style={{marginTop:20}}>Chọn hình ảnh</div>
            <FileBase64
              multiple={ false }
              onDone={(file)=>setObjEditBrandValue({...objEditBrandValue, image: file})} 
            />
            {/* <div style={{marginTop:10}}></div> */}
            <div style={{color:'#d32f2f',fontSize:12,marginLeft:16}}>{objEditBrandMess.image}</div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:10,alignItems:'center'}}>
              <img src={itemClick.image} height={100} width={100} className={styles.borderCustom} />
              <ArrowCircleRightIcon color='primary'/>
              <img src={objEditBrandValue.image.base64} height={100} width={100} />
            </div>
            <div style={{display:'flex',justifyContent:'end',marginTop:'20px'}}>
              <Button variant="text" sx={{width:100}} onClick={()=>setOpenEditBrand(false)} >Hủy</Button>
              <Button variant="contained"  sx={{marginLeft:'20px'}} onClick={handleEditBrand}>Chỉnh sửa</Button>
            </div>
          </div>
        </div>
      </Modal>
    
    </div>
  );
}

export default BrandDataGrid;
