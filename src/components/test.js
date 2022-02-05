import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

export default function BasicList() {
	return (
		<Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
			<nav aria-label="main ">
				<List>
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText primary="Inbox" />
						</ListItemButton>
					</ListItem>
					<Divider />
					<ListItem disablePadding>
						<ListItemButton>
							<ListItemText primary="Drafts" />
						</ListItemButton>
					</ListItem>
				</List>
			</nav>

		</Box>
	);
}

//mt-4 navbar me  style={{ height: '50px' }} in inner div

import React, { useState } from "react";
import { render } from "react-dom";

const HoverableDiv = ({ handleMouseOver, handleMouseOut }) => {
	return (
		<div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
			<span>Hover Me</span>
		</div>
	);
};

const HoverText = () => {
	return (
		<div>
			Hovering right meow!
			<span role="img" aria-label="cat">
				🐱
			</span>
		</div>
	);
};

const HoverExample = () => {
	const [isHovering, setIsHovering] = useState(false);
	const handleMouseOver = () => {
		setIsHovering(true);
	};

	const handleMouseOut = () => {
		setIsHovering(false);
	};

	return (
		<div>
			{/* Hover over this div to hide/show <HoverText /> */}
			<HoverableDiv
				handleMouseOver={handleMouseOver}
				handleMouseOut={handleMouseOut}
			/>
			{isHovering && <HoverText />}
		</div>
	);
};

render(<HoverExample />, document.getElementById("root"));
