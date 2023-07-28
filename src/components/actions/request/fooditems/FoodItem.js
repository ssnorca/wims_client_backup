import React, {Component} from 'react';
import ItemListNav from './ItemListNav';
import ModalFoodRelease from './releases/ModalFoodRelease';
import ModalFoodAllocate from './allocate/ModalFoodAllocate';
import MainModal from './MainModal';
import Modal from 'react-responsive-modal';
export default class FoodItem extends Component{

    state = {
        open: false,
        val:''
    };
    
    onOpenModal = (e) => {
       
        this.setState({ 
            open: true
         });
         this.setMainModalValue(e)
    };
    
    onCloseModal = () => {
        this.setState({ open: false });
        //console.log('wow')
    };

    setMainModalValue = (e)=>{
        const id = e.target.id;
        if(id==='allocate'){
            this.setState({
                val: <ModalFoodAllocate onCloseModal={this.onCloseModal} release={this.props.requests} onAllocate={this.props.onAllocate}/>
            });
           // this.isAllocDisabled(id)
        }else{
            this.setState({
                val: <ModalFoodRelease onCloseModal={this.onCloseModal} release={this.props.requests}/>
            });
          //  this.isReleaseDisabled(id)
        }        
        
      }

    render(){
        const  {open} = this.state;
        return(
            <React.Fragment>
                
                <ItemListNav 
                requests={this.props.requests} 
                onOpenModal = {this.onOpenModal}
                onListView = {this.props.onListView}
                />

                <MainModal open={open} onCloseModal={this.onCloseModal}>{this.state.val}</MainModal>

                

            </React.Fragment>
        )
        
    }
}