import React from "react";
import Select from "react-select";
import {
  FilterWrapper,
  Box,
  InputWrappers,
  StyledInput,
} from "./Table.style";

const InvoiceFilter = ({
  filters,
  allSuppliers,
  unpaidInvoices,
  excludedSuppliers,
  customSelectStyles,
  handleFilterChange,
  handleInvoiceNumberChange,
  handleExcludeSupplierChange,
  showFilter,
}) => {
  return (
    <FilterWrapper show={showFilter}>
      <Box>
        <InputWrappers>
          <p>Due Date Before: </p>
          <StyledInput
            type="date"
            name="dueDate"
            value={filters.dueDate}
            onChange={handleFilterChange}
            style={{ marginRight: "0.5rem" }}
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
            handleFilterChange({
              target: {
                name: "supplier",
                value: selectedOption ? selectedOption.value : "",
              },
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
  );
};

export default InvoiceFilter;
