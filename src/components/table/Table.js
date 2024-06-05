import React, { useState } from "react";
import { CardWrapper } from "./Table.style";
import data from "../../mockData/pay-run";
import { TableInvoice, TableHeader, TableBody, TableContainer } from "./Table.style";

const Table = () => {
  const [filters, setFilters] = useState({
    maxAmount: '',
    dueDate: '',
    supplier: '',
    postedDate: '',
  });

  const [unpaidInvoices, setUnpaidInvoices] = useState(data.pay_run.invoices);
  const [paidInvoices, setPaidInvoices] = useState([]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const filterInvoices = (invoices) => {
    return invoices.filter((invoice) => {
      const maxAmountFilter = filters.maxAmount ? invoice.amount <= parseFloat(filters.maxAmount) : true;
      const dueDateFilter = filters.dueDate ? new Date(invoice.due_date) <= new Date(filters.dueDate) : true;
      const supplierFilter = filters.supplier ? invoice.supplier.toLowerCase().includes(filters.supplier.toLowerCase()) : true;
      const postedDateFilter = filters.postedDate ? new Date(invoice.posted_date) <= new Date(filters.postedDate) : true;

      return maxAmountFilter && dueDateFilter && supplierFilter && postedDateFilter;
    });
  };

  const handlePayAll = () => {
    const filteredInvoices = filterInvoices(unpaidInvoices);
    setPaidInvoices([...paidInvoices, ...filteredInvoices]);
    setUnpaidInvoices(unpaidInvoices.filter(invoice => !filteredInvoices.includes(invoice)));
    // Optionally, reset the filters after paying the invoices
    setFilters({
      maxAmount: '',
      dueDate: '',
      supplier: '',
      postedDate: '',
    });
  };

  console.log("unpaid invoices", unpaidInvoices.length)
  console.log('paid invoices', paidInvoices.length)

  return (
    <CardWrapper>
      <div style={{ margin: '1rem' }}>
        <label>
          Max Amount: 
          <input 
            type="number" 
            name="maxAmount"
            value={filters.maxAmount} 
            onChange={handleFilterChange} 
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }} 
          />
        </label>
        <label>
          Due Date Before: 
          <input 
            type="date" 
            name="dueDate"
            value={filters.dueDate} 
            onChange={handleFilterChange} 
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }} 
          />
        </label>
        <label>
          Supplier: 
          <input 
            type="text" 
            name="supplier"
            value={filters.supplier} 
            onChange={handleFilterChange} 
            style={{ marginLeft: '0.5rem', marginRight: '1rem' }} 
          />
        </label>
        <label>
          Posted Date Before: 
          <input 
            type="date" 
            name="postedDate"
            value={filters.postedDate} 
            onChange={handleFilterChange} 
            style={{ marginLeft: '0.5rem' }} 
          />
        </label>
      </div>
      <TableContainer>
        <TableInvoice>
          <TableHeader>
            <tr>
              <th>Supplier's Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Posted Date</th>
              <th>Due Date</th>
              <th>Invoice number</th>
            </tr>
          </TableHeader>
          <TableBody>
            {filterInvoices(unpaidInvoices).map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.supplier}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.status}</td>
                <td>{invoice.posted_date}</td>
                <td>{invoice.due_date}</td>
                <td>{invoice.invoice_number}</td>

              </tr>
            ))}
          </TableBody>
        </TableInvoice>
      </TableContainer>
      <div style={{ margin: '1rem', textAlign: 'center' }}>
        <button onClick={handlePayAll} style={{ padding: '0.5rem 1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Pay All
        </button>
      </div>
    </CardWrapper>
  );
};

export default Table;
