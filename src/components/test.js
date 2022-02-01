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
