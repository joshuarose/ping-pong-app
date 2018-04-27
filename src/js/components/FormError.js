import React from 'react';
import {Alert} from 'react-bootstrap'

export const FormErrors = ({formErrors}) =>{
	if (formErrors.constructor === Object)  {
		return(
			<div className='formErrors'>
	        	<Alert bsStyle="warning"  key={formErrors.statusCode}>
				  {formErrors.message}
				</Alert>       

	  		</div>
	  	)
	}else{return[]}
}


