import React, { useState, useEffect } from "react";
import Select from "react-select";
import { CardWrapper } from "./Table.style";
import data from "../../mockData/pay-run";
import {
  TableInvoice,
  TableHeader,
  TableBody,
  TableContainer,
  Box,
  PayButton,
  CancelButton,
  FilterWrapper,
  InputWrappers,
  StyledInput,
  IconButton
} from "./Table.style";

import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';

const Table = () => {
  const [filters, setFilters] = useState({
    maxAmount: "",
    dueDate: "",
    supplier: "",
    postedDate: "",
    invoiceNumbers: [],
  });

  const [unpaidInvoices, setUnpaidInvoices] = useState(data.pay_run.invoices);
  const [paidInvoices, setPaidInvoices] = useState([]);
  const [allSuppliers, setAllSuppliers] = useState([]);
  const [excludedSuppliers, setExcludedSuppliers] = useState([]);
  const [showFilter, setShowFilter] = useState(false)

  useEffect(() => {
    // Extracting unique suppliers from the invoice data
    const suppliers = Array.from(
      new Set(data.pay_run.invoices.map((invoice) => invoice.supplier))
    );
    setAllSuppliers(
      suppliers.map((supplier) => ({ value: supplier, label: supplier }))
    );
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleInvoiceNumberChange = (selectedOptions) => {
    setFilters({
      ...filters,
      invoiceNumbers: selectedOptions || [],
    });
  };

  const handleExcludeSupplierChange = (selectedOptions) => {
    const excludedSuppliers = selectedOptions.map((option) => option.value);
    setExcludedSuppliers(excludedSuppliers);
  };

  const filterInvoices = (invoices) => {
    return invoices.filter((invoice) => {
      const { maxAmount, dueDate, supplier, postedDate, invoiceNumbers } = filters;
  
      const maxAmountFilter = maxAmount ? invoice.amount <= parseFloat(maxAmount) : true;
      const dueDateFilter = dueDate ? new Date(invoice.due_date) <= new Date(dueDate) : true;
      const supplierFilter = supplier
        ? invoice.supplier.toLowerCase().includes(supplier.toLowerCase())
        : true;
      const postedDateFilter = postedDate ? new Date(invoice.posted_date) <= new Date(postedDate) : true;
      const invoiceNumberFilter = invoiceNumbers.length > 0
        ? invoiceNumbers.some(opt => opt.value === invoice.invoice_number)
        : true;
      const excludeSupplierFilter = excludedSuppliers.length > 0
        ? !excludedSuppliers.includes(invoice.supplier)
        : true;
  
      return (
        maxAmountFilter &&
        dueDateFilter &&
        supplierFilter &&
        postedDateFilter &&
        invoiceNumberFilter &&
        excludeSupplierFilter
      );
    });
  };

  

  const handlePayAll = () => {
    const filteredInvoices = filterInvoices(unpaidInvoices);
    setPaidInvoices([...paidInvoices, ...filteredInvoices]);
    setUnpaidInvoices(
      unpaidInvoices.filter((invoice) => !filteredInvoices.includes(invoice))
    );
    setFilters({
      maxAmount: "",
      dueDate: "",
      supplier: "",
      postedDate: "",
      invoiceNumbers: [],
    });
    setExcludedSuppliers([]);
  };

  const handleFilterShow = () => {
    setShowFilter(!showFilter)
  }

  const handleResetFilters = () => {
    setFilters({
      maxAmount: "",
      dueDate: "",
      supplier: "",
      postedDate: "",
      invoiceNumbers: [],
    });
    setExcludedSuppliers([]);
  };

  const customSelectStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
  };

  const convertDate = (dateStr)  => {
  
    let parts = dateStr.split("-");
    let dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    let day = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let formattedDay = day < 10 ? "0" + day : day;
    let formattedMonth = month < 10 ? "0" + month : month;

    let formattedDate = formattedDay + "/" + formattedMonth + "/" + year;
    
    return formattedDate;
}


console.log("paid invoices:",paidInvoices)
console.log("unpaid invoices:",unpaidInvoices)


  return (
    <CardWrapper>
      {showFilter && (
        <FilterWrapper>
        <Box>
          <InputWrappers>
            <p>Due Date Before: </p>
            <StyledInput
              type="date"
              name="dueDate"
              value={filters.dueDate}
              onChange={handleFilterChange}
              style={{marginRight: '0.5rem'}}
            />
          </InputWrappers>
          <InputWrappers>
            <p>Posted Date Before:</p>

            <StyledInput
              type="date"
              name="postedDate"
              value={filters.postedDate}
              onChange={handleFilterChange}
            />
          </InputWrappers>
        </Box>
        <InputWrappers>
            <p>Maximum Invoice Amount:</p>
            <StyledInput
              type="number"
              name="maxAmount"
              value={filters.maxAmount}
              onChange={handleFilterChange}
            />
          </InputWrappers>
        <InputWrappers>
          <p>Invoice Numbers:</p>
          <Select
            isMulti
            name="invoiceNumbers"
            options={unpaidInvoices.map((invoice) => ({
              value: invoice.invoice_number,
              label: invoice.invoice_number,
            }))}
            classNamePrefix="select"
            value={filters.invoiceNumbers}
            onChange={handleInvoiceNumberChange}
            styles={customSelectStyles}
          />
        </InputWrappers>

        <InputWrappers>
          <p>Select Single Supplier: </p>
          <Select
            name="supplier"
            options={allSuppliers}
            value={allSuppliers.filter((opt) => opt.value === filters.supplier)}
            onChange={(selectedOption) =>
              setFilters({
                ...filters,
                supplier: selectedOption ? selectedOption.value : "",
              })
            }
            styles={customSelectStyles}
          />
        </InputWrappers>

        <InputWrappers>
          <p>Exclude Supplier&#40;s&#41;: </p>
          <Select
            isMulti
            name="excludeSupplier"
            options={allSuppliers}
            value={allSuppliers.filter((opt) =>
              excludedSuppliers.includes(opt.value)
            )}
            onChange={handleExcludeSupplierChange}
            styles={customSelectStyles}
          />
        </InputWrappers>
      </FilterWrapper>
      )}
      

      <TableContainer>
        <TableInvoice>
          <TableHeader>
            <tr>
              <th>Supplier's Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Posted Date</th>
              <th>Due Date</th>
              <th>Invoice Number</th>
            </tr>
          </TableHeader>
          <TableBody>
            {filterInvoices(unpaidInvoices).map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.supplier}</td>
                <td>{"£" + invoice.amount.toLocaleString()}</td> 
                {/* toLocaleString to add a coma in the thousands */}
                <td>{invoice.status}</td>
                <td>{convertDate(invoice.posted_date)}</td>
                <td>{convertDate(invoice.due_date)}</td>
                <td>{invoice.invoice_number}</td>
              </tr>
            ))}
          </TableBody>
        </TableInvoice>
      </TableContainer>
      <div style={{ display: 'flex', textAlign: "center", margin: '0.5rem 0' }}>
        {showFilter ? (
          <IconButton onClick={handleFilterShow}><FilterAltOffOutlinedIcon /></IconButton>
        ) : (
          <IconButton onClick={handleFilterShow}><FilterAltOutlinedIcon /></IconButton>
        )}
        <CancelButton onClick={handleResetFilters}>Reset filters</CancelButton>
        <PayButton onClick={handlePayAll}>Pay Invoices</PayButton>
      </div>
    </CardWrapper>
  );
};

export default Table;