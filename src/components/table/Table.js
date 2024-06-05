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
      const maxAmountFilter = filters.maxAmount
        ? invoice.amount <= parseFloat(filters.maxAmount)
        : true;
      const dueDateFilter = filters.dueDate
        ? new Date(invoice.due_date) <= new Date(filters.dueDate)
        : true;
      const supplierFilter = filters.supplier
        ? invoice.supplier
            .toLowerCase()
            .includes(filters.supplier.toLowerCase())
        : true;
      const postedDateFilter = filters.postedDate
        ? new Date(invoice.posted_date) <= new Date(filters.postedDate)
        : true;
      const invoiceNumberFilter =
        filters.invoiceNumbers.length > 0
          ? filters.invoiceNumbers.some(
              (opt) => opt.value === invoice.invoice_number
            )
          : true;
      const excludeSupplierFilter =
        excludedSuppliers.length > 0
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
            <p>Max Amount:</p>
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
          <p>Include Supplier: </p>
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
          <p>Exclude Supplier: </p>
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
                <td>{"£" + invoice.amount}</td>
                <td>{invoice.status}</td>
                <td>{invoice.posted_date}</td>
                <td>{invoice.due_date}</td>
                <td>{invoice.invoice_number}</td>
              </tr>
            ))}
          </TableBody>
        </TableInvoice>
      </TableContainer>
      <div style={{ display: 'flex', margin: "0rem", textAlign: "center" }}>
        {showFilter ? (
          <IconButton onClick={handleFilterShow}><FilterAltOffOutlinedIcon /></IconButton>
        ) : (
          <IconButton onClick={handleFilterShow}><FilterAltOutlinedIcon /></IconButton>
        )}
        <CancelButton onClick={handleResetFilters}>Reset filters</CancelButton>
        <PayButton onClick={handlePayAll}>Pay All</PayButton>
      </div>
    </CardWrapper>
  );
};

export default Table;
