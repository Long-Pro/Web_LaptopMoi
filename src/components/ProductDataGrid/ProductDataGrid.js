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
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import Autocomplete from '@mui/material/Autocomplete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ProductDetail from '../../components/ProductDetail/ProductDetail'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import NumberFormat from 'react-number-format';

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
function ProductDataGrid() {
  let navigate = useNavigate();
  const [listBrand, setListBrand] = useState([]);
  const [listProduct, setListProduct] = useState([]);
  const [pageSize, setPageSize] = useState(5);

  const [itemClick, setItemClick] = useState({});
  const [brandClick, setBrandClick] = useState('');

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [openDetailProduct, setOpenDetailProduct] = useState(false);


  const [objAddProductValue, setObjAddProductValue] = useState({
    name:'',
    brand:{},
    battery:'',
    card:'',
    cpu:'',
    hardDrive:'',
    operatingSystem:'',
    price:'',
    ram:'',
    screen:'',
    description:'',
    image:{},
  })
  const [objAddProductMess, setObjAddProductMess] = useState({
    name:'',
    battery:'',
    card:'',
    cpu:'',
    hardDrive:'',
    operatingSystem:'',
    price:'',
    ram:'',
    screen:'',
    description:'',
  })


  const [objEditProductValue, setObjEditProductValue] = useState({
    name:'',
    brand:{},
    battery:'',
    card:'',
    cpu:'',
    hardDrive:'',
    operatingSystem:'',
    price:'',
    ram:'',
    screen:'',
    description:'',
    image:{},
  })
  const [objEditProductMess, setObjEditProductMess] = useState({
    name:'',
    battery:'',
    card:'',
    cpu:'',
    hardDrive:'',
    operatingSystem:'',
    price:'',
    ram:'',
    screen:'',
    description:'',
  })



  let columnsProduct=[
    { field: 'id', headerName: 'ID',flex: 3},
    { field: 'name', headerName: 'Tên',flex: 2 },
    { field: 'image', headerName: 'Hình ảnh',align: "center",headerAlign: 'center',
      renderCell: (params) => {
        return <img  src={params.value} width='60' height='60' />
      }
    },
    // { field: 'brand', headerName: 'Thương hiệu'},
    { field: 'cpu', headerName: 'CPU'},
    { field: 'ram', headerName: 'RAM'},
    { field: 'card', headerName: 'Card',flex: 2},
    { field: 'hardDrive', headerName: 'Ổ cứng'},
    // { field: 'screen', headerName: 'Màn hình'},
    // { field: 'battery', headerName: 'Pin'},
    // { field: 'operatingSystem', headerName: 'Hệ điều hành'},
    { field: 'price', headerName: 'Giá tiền',
      renderCell: (params) => {
        return <NumberFormat value={params.value} displayType={'text'} thousandSeparator={true} />
      }
    },
    { field: '_id', headerName: 'Thao tác',width:150,headerAlign: 'center',disableExport: true,
      renderCell: (params) => {
        return <div style={{display:'flex',justifyContent:'space-evenly',flex:1}}>
            <IconButton
              onClick={()=>clickDetailProduct(params.row)}
            >
            <VisibilityIcon
              color="primary" 
            />
          </IconButton>
          <IconButton
            onClick={()=>clickDeleteProduct(params.row)}
          >
            <DeleteIcon
              color="primary" 
            />
          </IconButton>
          <IconButton
            onClick={()=>clickEditProduct(params.row)}
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
    getBrands()
  },[])
  const getBrands=()=>{
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
        data.forEach(item=>item.label=item.name)
        data.sort((a,b)=>a.label.localeCompare(b.label))
        setBrandClick(data[0])
        setListBrand(data)
        getProductsByBrand(data[0]._id)
      }
    })
    .catch((error)=> {
      console.log({error})
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }
  const changeBrand=(item)=>{
    setBrandClick(item)
    let {_id,label}=item
    // console.log({_id,label})
    getProductsByBrand(_id)
  }
  const getProductsByBrand=(brandId)=>{
    let token=localStorage.getItem("token");
    let api=brandId?`/products/brand/${brandId}`:'/products'

    axios.get(api,{
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
        setListProduct(data)
      }
    })
    .catch((error)=> {
      console.log({error})
      let{data,status}=error.response
      if(data=='Invalid Token'&&status==401) navigate("/login", { replace: true });
      showErrorMess('Xác thực token thất bại')
    });
  }
  const clickDetailProduct=(product)=>{
    setOpenDetailProduct(true)
    // console.log(product)
    setItemClick(product)
  }



  const clickAddProduct=()=>{
    setOpenAddProduct(true)
    setObjAddProductValue({
      name:'',
      brand:listBrand[0],
      battery:'',
      card:'',
      cpu:'',
      hardDrive:'',
      operatingSystem:'',
      price:'',
      ram:'',
      screen:'',
      description:'',
      image:{},
    })
    setObjAddProductMess({
      name:'',
      battery:'',
      card:'',
      cpu:'',
      hardDrive:'',
      operatingSystem:'',
      price:'',
      ram:'',
      screen:'',
      description:'',
      image:''
    })
  }
  const handleAddProduct=()=>{
    // console.log('objAddProductValue',objAddProductValue)
    let {name,brand,battery,card,cpu,hardDrive,image,operatingSystem,price,ram,screen,description}=objAddProductValue
    name=name.trim()
    battery=battery.trim()
    card=card.trim()
    cpu=cpu.trim()
    hardDrive=hardDrive.trim()
    operatingSystem=operatingSystem.trim()
    price=price.trim()
    ram=ram.trim()
    screen=screen.trim()
    description=description.trim()
    setObjAddProductValue({name,brand,battery,card,cpu,hardDrive,image,operatingSystem,price,ram,screen,description})
    let nameMess,batteryMess,cardMess,cpuMess,hardDriveMess,imageMess,operatingSystemMess,priceMess,ramMess,screenMess,descriptionMess
    nameMess=name==''?'Không được bỏ trống':''
    batteryMess=battery==''?'Không được bỏ trống':''
    cardMess=card==''?'Không được bỏ trống':''
    cpuMess=cpu==''?'Không được bỏ trống':''
    hardDriveMess=hardDrive==''?'Không được bỏ trống':''
    operatingSystemMess=operatingSystem==''?'Không được bỏ trống':''
    priceMess=price==''?'Không được bỏ trống':''
    ramMess=ram==''?'Không được bỏ trống':''
    screenMess=screen==''?'Không được bỏ trống':''
    descriptionMess=description==''?'Không được bỏ trống':''

    if(image.type&&image.type.includes('image')) imageMess=''
      else imageMess='Vui lòng chọn ảnh'
    setObjAddProductMess({
      name:nameMess,
      battery:batteryMess,
      card:cardMess,
      cpu:cpuMess,
      hardDrive:hardDriveMess,
      image:imageMess,
      operatingSystem:operatingSystemMess,
      price:priceMess,
      ram:ramMess,
      screen:screenMess,
      description:descriptionMess,
    })
    if(nameMess||batteryMess||cardMess||cpuMess||hardDriveMess||imageMess||operatingSystemMess||priceMess||ramMess||screenMess||descriptionMess) return

    console.log('validate success')
    let data=objAddProductValue.image.base64.split(',')[1]
    let token=localStorage.getItem("token");
    axios.post(linkFileStore,{data:data})
    .then(res=>{
      // console.log(res)
      let link=res.data.split('>')[1].split('<')[0]
      // console.log(link)

      axios.post(`/products`,{name,brand:brand._id,battery,card,cpu,hardDrive,image:link,operatingSystem,price:parseInt(price),ram,screen,description},{
        headers: {
          'x-access-token':token,
        }
      })
      .then(res=>{
        let {data,message,type}=res.data
        if(type==FAIL) showErrorMess(message[0])
        else{ 
          getProductsByBrand(brandClick._id)
          showSuccessMess(message[0])
          setOpenAddProduct(false)
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

  const clickEditProduct=(obj)=>{
    setItemClick(obj)
    let brand=listBrand.find(item=>item._id==obj.brand._id)
    // console.log('obj',obj)
    // console.log('brand',brand)
    setOpenEditProduct(true)
    setObjEditProductValue({
      ...obj,brand,image:{},price:obj.price+''
    })
    setObjEditProductMess({
      name:'',
      battery:'',
      card:'',
      cpu:'',
      hardDrive:'',
      operatingSystem:'',
      price:'',
      ram:'',
      screen:'',
      description:'',
      image:''
    })

  }
  const handleEditProduct=()=>{
    // console.log('objEditProductValue',objEditProductValue)
    let {name,brand,battery,card,cpu,hardDrive,image,operatingSystem,price,ram,screen,description}=objEditProductValue
    name=name.trim()
    battery=battery.trim()
    card=card.trim()
    cpu=cpu.trim()
    hardDrive=hardDrive.trim()
    operatingSystem=operatingSystem.trim()
    price=price.trim()
    ram=ram.trim()
    screen=screen.trim()
    description=description.trim()
    setObjEditProductValue({name,brand,battery,card,cpu,hardDrive,image,operatingSystem,price,ram,screen,description})
    let nameMess,batteryMess,cardMess,cpuMess,hardDriveMess,imageMess,operatingSystemMess,priceMess,ramMess,screenMess,descriptionMess
    nameMess=name==''?'Không được bỏ trống':''
    batteryMess=battery==''?'Không được bỏ trống':''
    cardMess=card==''?'Không được bỏ trống':''
    cpuMess=cpu==''?'Không được bỏ trống':''
    hardDriveMess=hardDrive==''?'Không được bỏ trống':''
    operatingSystemMess=operatingSystem==''?'Không được bỏ trống':''
    priceMess=price==''?'Không được bỏ trống':''
    ramMess=ram==''?'Không được bỏ trống':''
    screenMess=screen==''?'Không được bỏ trống':''
    descriptionMess=description==''?'Không được bỏ trống':''

    if(image.type&&image.type.includes('image')) imageMess=''
      else imageMess='Vui lòng chọn ảnh'
    setObjEditProductMess({
      name:nameMess,
      battery:batteryMess,
      card:cardMess,
      cpu:cpuMess,
      hardDrive:hardDriveMess,
      image:imageMess,
      operatingSystem:operatingSystemMess,
      price:priceMess,
      ram:ramMess,
      screen:screenMess,
      description:descriptionMess,
    })
    if(nameMess||batteryMess||cardMess||cpuMess||hardDriveMess||imageMess||operatingSystemMess||priceMess||ramMess||screenMess||descriptionMess) return

    console.log('validate success')
    let data=objEditProductValue.image.base64.split(',')[1]
    let token=localStorage.getItem("token");
    axios.post(linkFileStore,{data:data})
    .then(res=>{
      // console.log(res)
      let link=res.data.split('>')[1].split('<')[0]
      // console.log(link)

      axios.patch(`/products/${itemClick._id}`,{name,brand:brand._id,battery,card,cpu,hardDrive,operatingSystem,price:parseInt(price),ram,screen,description,image:link},{
        headers: {
          'x-access-token':token,
        }
      })
      .then(res=>{
        let {data,message,type}=res.data
        if(type==FAIL) showErrorMess(message[0])
        else{ 
          getProductsByBrand(itemClick._id)
          showSuccessMess(message[0])
          setOpenEditProduct(false)
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


  const clickDeleteProduct=(obj)=>{
    setItemClick(obj)
    setOpenDeleteProduct(true)
  }
  const handleDeleteProduct=()=>{
    let token=localStorage.getItem("token");
    axios.delete(`/products/${itemClick.id}`,{
      headers: {
        'x-access-token':token,
      }
    })
    .then(res=>{
      let {data,message,type}=res.data
      if(type==FAIL) showErrorMess(message[0])
      else{ 
        getProductsByBrand(brandClick._id)
        setOpenDeleteProduct(false)
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
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
        {listBrand.length&&<Autocomplete
          disablePortal
          id="combo-box-demo"
          options={[...listBrand,{label:'--- Tất cả ---',_id:''}]}
          value={brandClick}
          sx={{ width: 300 }}
          onChange={(event, newValue) => changeBrand(newValue)}
          renderInput={(params) => <TextField {...params} label="Thương hiệu" />}
        />}
        <Button variant="outlined"
          startIcon={<AddCircleIcon />}
          onClick={clickAddProduct}
        >
          Thêm
        </Button>
      </div>
      <DataGrid
        rows={listProduct}
        columns={columnsProduct}
        rowHeight={80}
        disableSelectionOnClick
        autoHeight
        components={{
          Toolbar: CustomToolbar,
        }}
        pageSize={pageSize}
        rowsPerPageOptions={[5,10,20]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      />
      {/* add product */}
      <Modal
        open={openAddProduct}
        onClose={()=>setOpenAddProduct(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal} style={{width:1100}}>
          <div className={styles.form}>
            <div className={styles.title}>Thêm sản phẩm</div>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
              <TextField sx={{ width:'300px'}} label="Tên" variant="outlined" value={objAddProductValue.name} margin="normal"  
                onChange={(event)=>setObjAddProductValue({...objAddProductValue,name:event.target.value})}
                error={Boolean(objAddProductMess.name)}
                helperText={objAddProductMess.name}
              />
              {listBrand.length&&<Autocomplete
                disablePortal
                options={listBrand}
                value={objAddProductValue.brand}
                sx={{ width: 300 }}
                onChange={(event, newValue) => setObjAddProductValue({...objAddProductValue,brand:newValue}) }
                renderInput={(params) => <TextField {...params} label="Thương hiệu"  margin="normal"  />}
              />}
              <TextField sx={{ width:'300px'}} label="CPU" variant="outlined" value={objAddProductValue.cpu} margin="normal" 
                onChange={(event)=>setObjAddProductValue({...objAddProductValue,cpu:event.target.value})}
                error={Boolean(objAddProductMess.cpu)}
                helperText={objAddProductMess.cpu}
              />
              <TextField sx={{ width:'300px'}} label="RAM" variant="outlined" value={objAddProductValue.ram} margin="normal" 
                onChange={(event)=>setObjAddProductValue({...objAddProductValue,ram:event.target.value})}
                error={Boolean(objAddProductMess.ram)}
                helperText={objAddProductMess.ram} 
              />
              <TextField sx={{ width:'300px'}} label="Card" variant="outlined" value={objAddProductValue.card} margin="normal" 
                onChange={(event)=>setObjAddProductValue({...objAddProductValue,card:event.target.value})}
                error={Boolean(objAddProductMess.card)}
                helperText={objAddProductMess.card}
              />
              <TextField sx={{ width:'300px'}} label="Ổ cứng" variant="outlined" value={objAddProductValue.hardDrive}  margin="normal" 
                onChange={(event)=>setObjAddProductValue({...objAddProductValue,hardDrive:event.target.value})}
                error={Boolean(objAddProductMess.hardDrive)}
                helperText={objAddProductMess.hardDrive}
              />
              <TextField sx={{ width:'300px'}} label="Hệ điều hành" variant="outlined" value={objAddProductValue.operatingSystem}  margin="normal" 
                onChange={(event)=>setObjAddProductValue({...objAddProductValue,operatingSystem:event.target.value})}
                error={Boolean(objAddProductMess.operatingSystem)}
                helperText={objAddProductMess.operatingSystem}
              />
              <TextField sx={{ width:'300px'}} label="Màn hình" variant="outlined" value={objAddProductValue.screen}  margin="normal" 
                onChange={(event)=>setObjAddProductValue({...objAddProductValue,screen:event.target.value})}
                error={Boolean(objAddProductMess.screen)}
                helperText={objAddProductMess.screen}
              />
              <TextField sx={{ width:'300px'}} label="Pin" variant="outlined" value={objAddProductValue.battery}  margin="normal" 
                onChange={(event)=>setObjAddProductValue({...objAddProductValue,battery:event.target.value})}
                error={Boolean(objAddProductMess.battery)}
                helperText={objAddProductMess.battery}
              />
              <TextField sx={{ width:'300px'}} label="Giá tiền" variant="outlined" value={objAddProductValue.price}  margin="normal" 
                onChange={(event)=>setObjAddProductValue({...objAddProductValue,price:event.target.value})}
                error={Boolean(objAddProductMess.price)}
                helperText={objAddProductMess.price}
              />
            </div>

            <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
              <div style={{ flex:1}}>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="  Mô tả"
                  minRows={10}
                  maxRows={10}
                  style={{width:'100%'}}
                  value={objAddProductValue.description}
                  onChange={(event)=>setObjAddProductValue({...objAddProductValue,description:event.target.value})}
                  className={styles.borderCustom}
                />
                <div style={{color:'#d32f2f',fontSize:12,marginLeft:16}}>{objAddProductMess.description}</div>
              </div>
              <div style={{marginLeft:20}}>
                <div>Chọn hình ảnh</div>
                <FileBase64
                  multiple={ false }
                  onDone={(file)=>setObjAddProductValue({...objAddProductValue, image: file})} 
                />
                <img src={objAddProductValue.image.base64} height={100} width={100} style={{marginTop:8,display:'block'}} className={styles.borderCustom} />
                <div style={{color:'#d32f2f',fontSize:12,marginLeft:16}}>{objAddProductMess.image}</div>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'end',marginTop:'20px'}}>
              <Button variant="text" sx={{width:100}} onClick={()=>setOpenAddProduct(false)} >Hủy</Button>
              <Button variant="contained"  sx={{marginLeft:'20px'}} onClick={handleAddProduct}>Thêm</Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* delete product */}
      <Dialog
        open={openDeleteProduct}
        onClose={()=>setOpenDeleteProduct(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <div style={{minWidth:300}}>
            Xác nhận

          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Xóa sản phẩm {itemClick.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenDeleteProduct(false)}>Hủy</Button>
          <Button onClick={handleDeleteProduct} variant="contained">Xóa</Button>
        </DialogActions>
      </Dialog>
      {/* Edit product */}
      <Modal
        open={openEditProduct}
        onClose={()=>setOpenEditProduct(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal} style={{width:1100}}>
          <div className={styles.form}>
            <div className={styles.title}>Chỉnh sửa sản phẩm {itemClick.name}</div>
            <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-between'}}>
              <TextField sx={{ width:'300px'}} label="ID" variant="outlined" defaultValue={objEditProductValue._id} margin="normal" InputProps={{readOnly: true}}   />
              <TextField sx={{ width:'300px'}} label="Tên" variant="outlined" value={objEditProductValue.name} margin="normal"  
                onChange={(event)=>setObjEditProductValue({...objEditProductValue,name:event.target.value})}
                error={Boolean(objEditProductMess.name)}
                helperText={objEditProductMess.name}
              />
              {listBrand.length&&<Autocomplete
                disablePortal
                options={listBrand}
                value={objEditProductValue.brand}
                sx={{ width: 300 }}
                onChange={(event, newValue) => setObjEditProductValue({...objEditProductValue,brand:newValue}) }
                renderInput={(params) => <TextField {...params} label="Thương hiệu"  margin="normal"  />}
              />}
              <TextField sx={{ width:'300px'}} label="CPU" variant="outlined" value={objEditProductValue.cpu} margin="normal" 
                onChange={(event)=>setObjEditProductValue({...objEditProductValue,cpu:event.target.value})}
                error={Boolean(objEditProductMess.cpu)}
                helperText={objEditProductMess.cpu}
              />
              <TextField sx={{ width:'300px'}} label="RAM" variant="outlined" value={objEditProductValue.ram} margin="normal" 
                onChange={(event)=>setObjEditProductValue({...objEditProductValue,ram:event.target.value})}
                error={Boolean(objEditProductMess.ram)}
                helperText={objEditProductMess.ram} 
              />
              <TextField sx={{ width:'300px'}} label="Card" variant="outlined" value={objEditProductValue.card} margin="normal" 
                onChange={(event)=>setObjEditProductValue({...objEditProductValue,card:event.target.value})}
                error={Boolean(objEditProductMess.card)}
                helperText={objEditProductMess.card}
              />
              <TextField sx={{ width:'300px'}} label="Ổ cứng" variant="outlined" value={objEditProductValue.hardDrive}  margin="normal" 
                onChange={(event)=>setObjEditProductValue({...objEditProductValue,hardDrive:event.target.value})}
                error={Boolean(objEditProductMess.hardDrive)}
                helperText={objEditProductMess.hardDrive}
              />
              <TextField sx={{ width:'300px'}} label="Hệ điều hành" variant="outlined" value={objEditProductValue.operatingSystem}  margin="normal" 
                onChange={(event)=>setObjEditProductValue({...objEditProductValue,operatingSystem:event.target.value})}
                error={Boolean(objEditProductMess.operatingSystem)}
                helperText={objEditProductMess.operatingSystem}
              />
              <TextField sx={{ width:'300px'}} label="Màn hình" variant="outlined" value={objEditProductValue.screen}  margin="normal" 
                onChange={(event)=>setObjEditProductValue({...objEditProductValue,screen:event.target.value})}
                error={Boolean(objEditProductMess.screen)}
                helperText={objEditProductMess.screen}
              />
              <TextField sx={{ width:'300px'}} label="Pin" variant="outlined" value={objEditProductValue.battery}  margin="normal" 
                onChange={(event)=>setObjEditProductValue({...objEditProductValue,battery:event.target.value})}
                error={Boolean(objEditProductMess.battery)}
                helperText={objEditProductMess.battery}
              />
              <TextField sx={{ width:'300px'}} label="Giá tiền" variant="outlined" value={objEditProductValue.price}  margin="normal" 
                onChange={(event)=>setObjEditProductValue({...objEditProductValue,price:event.target.value})}
                error={Boolean(objEditProductMess.price)}
                helperText={objEditProductMess.price}
              />
            </div>

            <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
              <div style={{ flex:1}}>
                <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="  Mô tả"
                  minRows={10}
                  maxRows={10}
                  style={{width:'100%'}}
                  value={objEditProductValue.description}
                  onChange={(event)=>setObjEditProductValue({...objEditProductValue,description:event.target.value})}
                  className={styles.borderCustom}
                />
                <div style={{color:'#d32f2f',fontSize:12,marginLeft:16}}>{objEditProductMess.description}</div>
              </div>
              <div style={{marginLeft:20}}>
                <div>Chọn hình ảnh</div>
                <FileBase64
                  multiple={ false }
                  onDone={(file)=>setObjEditProductValue({...objEditProductValue, image: file})} 
                />
                <div style={{color:'#d32f2f',fontSize:12,marginLeft:16}}>{objEditProductMess.image}</div>
                <div style={{display:'flex',justifyContent:'space-between',marginTop:8,alignItems:'center'}}>
                  <img src={itemClick.image} height={100} width={100} className={styles.borderCustom} />
                  <ArrowCircleRightIcon color='primary'/>
                  <img src={objEditProductValue.image.base64} height={100} width={100} />
                </div>
              </div>
            </div>
            <div style={{display:'flex',justifyContent:'end',marginTop:'20px'}}>
              <Button variant="text" sx={{width:100}} onClick={()=>setOpenEditProduct(false)} >Hủy</Button>
              <Button variant="contained"  sx={{marginLeft:'20px'}} onClick={handleEditProduct}>Chỉnh sửa</Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* detail Product */}
      <Modal
        open={openDetailProduct}
        onClose={()=>setOpenDetailProduct(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal} style={{width:1100}}>
          <ProductDetail product={itemClick}/>
        </div>
      </Modal>
    
    </div>
  );
}

export default ProductDataGrid;
