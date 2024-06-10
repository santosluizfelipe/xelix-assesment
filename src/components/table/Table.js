import React, { useState, useEffect } from "react";
import { CardWrapper } from "./Table.style";
import data from "../../mockData/pay-run";
import InvoiceFilter from "./InvoiceFilter";
import InvoiceTable from "./InvoiceTable";
import FilterIconButton from "./FilterIconButton";

import { convertDate } from "../utils/utils";
import { PayButton, CancelButton, IconButton } from "./Table.style";

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
  const [showFilter, setShowFilter] = useState(false);

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
      const { maxAmount, dueDate, supplier, postedDate, invoiceNumbers } =
        filters;

      const maxAmountFilter = maxAmount
        ? invoice.amount <= parseFloat(maxAmount)
        : true;
      const dueDateFilter = dueDate
        ? new Date(invoice.due_date) <= new Date(dueDate)
        : true;
      const supplierFilter = supplier
        ? invoice.supplier.toLowerCase().includes(supplier.toLowerCase())
        : true;
      const postedDateFilter = postedDate
        ? new Date(invoice.posted_date) <= new Date(postedDate)
        : true;
      const invoiceNumberFilter =
        invoiceNumbers.length > 0
          ? invoiceNumbers.some((opt) => opt.value === invoice.invoice_number)
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
    setShowFilter(!showFilter);
  };

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

  console.log("paid invoices:", paidInvoices);
  console.log("unpaid invoices:", unpaidInvoices);
  console.log("excluded suppliers", excludedSuppliers)

  return (
    <CardWrapper>
      {showFilter && (
        <InvoiceFilter
          filters={filters}
          allSuppliers={allSuppliers}
          unpaidInvoices={unpaidInvoices}
          excludedSuppliers={excludedSuppliers}
          customSelectStyles={customSelectStyles}
          handleFilterChange={handleFilterChange}
          handleInvoiceNumberChange={handleInvoiceNumberChange}
          handleExcludeSupplierChange={handleExcludeSupplierChange}
          showFilter={showFilter}
        />
      )}

      <InvoiceTable
        unpaidInvoices={unpaidInvoices}
        filterInvoices={filterInvoices}
        convertDate={convertDate}
      />
      <div style={{ display: "flex", textAlign: "center", margin: "0.5rem 0" }}>
         <FilterIconButton showFilter={showFilter} handleFilterShow={handleFilterShow} />
        <CancelButton onClick={handleResetFilters}>Reset filters</CancelButton>
        <PayButton onClick={handlePayAll}>Pay Invoices</PayButton>
      </div>
    </CardWrapper>
  );
};

export default Table;
