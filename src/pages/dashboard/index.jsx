import React, { useState } from 'react';
import {
  Avatar, AvatarGroup, Button, Grid, List, ListItemAvatar, ListItemButton, ListItemSecondaryAction, ListItemText, Stack, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import SaleReportCard from './SaleReportCard';
import OrdersTable from './OrdersTable';

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
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = () => {
    setFormData({ name: '', cnic: '', phone: '', address: '' });
    setEditIndex(null);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      // Update existing beneficiary
      const updatedBeneficiaries = beneficiaries.map((beneficiary, index) =>
        index === editIndex ? formData : beneficiary
      );
      setBeneficiaries(updatedBeneficiaries);
    } else {
      // Add new beneficiary
      setBeneficiaries([...beneficiaries, formData]);
    }
    setFormData({ name: '', cnic: '', phone: '', address: '' });
    setEditIndex(null);
    handleClose();
  };

  const handleEdit = (index) => {
    setFormData(beneficiaries[index]);
    setEditIndex(index);
    setOpen(true);
  };

  const handleDelete = (index) => {
    const updatedBeneficiaries = beneficiaries.filter((_, i) => i !== index);
    setBeneficiaries(updatedBeneficiaries);
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
      <Grid item xs={12} md={3}>
        <TextField variant="outlined" placeholder="Search beneficiaries..." onChange={handleSearch} size="small" fullWidth />
      </Grid>


      {/* Modal */}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{editIndex !== null ? 'Edit Beneficiary' : 'Add Beneficiary'}</DialogTitle>
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
            {editIndex !== null ? 'Update' : 'Submit'}
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBeneficiaries.map((beneficiary, index) => (
              <TableRow key={index}>
                <TableCell>{beneficiary.name}</TableCell>
                <TableCell>{beneficiary.cnic}</TableCell>
                <TableCell>{beneficiary.phone}</TableCell>
                <TableCell>{beneficiary.address}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(index)}>Delete</Button>
                </TableCell>
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
              <Typography variant="h3">\$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid>
    </Grid>
  );
}