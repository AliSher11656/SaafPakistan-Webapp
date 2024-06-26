// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// Amdin panel React components
import MDBox from "components/MDBox";

function DataTableBodyCell({ noBorder, align, children }) {
  return (
    <MDBox
      component="td"
      textAlign={align}
      py={1.5}
      px={3}
      sx={({
        palette: { light },
        typography: { size },
        borders: { borderWidth },
      }) => ({
        fontSize: size.sm,
        borderBottom: noBorder
          ? "none"
          : `${borderWidth[1]} solid ${light.main}`,
        color: "#000",
      })}
    >
      <MDBox
        display="inline-block"
        width="max-content"
        color="black"
        sx={{ verticalAlign: "middle", color: "black" }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};

// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
};

export default DataTableBodyCell;
