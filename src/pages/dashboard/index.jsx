import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cnic: '',
    phone: '',
    address: ''
  });
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = () => {
    setBeneficiaries([...beneficiaries, formData]);
    setFormData({ name: '', cnic: '', phone: '', address: '' });
    handleClose();
  };

  // Filter beneficiaries based on search query
  const filteredBeneficiaries = beneficiaries.filter((beneficiary) =>
    Object.values(beneficiary).some((value) => value.toLowerCase().includes(searchQuery))
  );

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Daily Insights" count="33" percentage={29.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Search Records" count="8,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Reports and Logs" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>

      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Beneficiary
        </Button>
      </Grid>

      {/* Search Bar */}
      <Grid item>
        <TextField variant="outlined" placeholder="Search beneficiaries..." onChange={handleSearch} size="small" fullWidth />
      </Grid>

      {/* Modal */}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Enter Details</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleChange} variant="outlined" />
            <TextField fullWidth label="CNIC" name="cnic" value={formData.cnic} onChange={handleChange} variant="outlined" />
            <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} variant="outlined" />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table */}
      <TableContainer sx={{ marginTop: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>CNIC</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBeneficiaries.map((beneficiary, index) => (
              <TableRow key={index}>
                <TableCell>{beneficiary.name}</TableCell>
                <TableCell>{beneficiary.cnic}</TableCell>
                <TableCell>{beneficiary.phone}</TableCell>
                <TableCell>{beneficiary.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <UniqueVisitorCard />
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>

      {/* Add the remaining rows and components */}
    </Grid>
  );
}
