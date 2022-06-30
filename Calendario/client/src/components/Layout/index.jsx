import React, { useState } from 'react'
import Header from './Header'

const Layout = ({ children }) => {
	const setOpen = useState(false)

	return (
		<>
			<Header setOpen={setOpen} />
			<div>
				{children}
			</div>
		</>
	)
}

export default Layout