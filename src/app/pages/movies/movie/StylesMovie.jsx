import { Box, Typography, styled } from "@mui/material";

export const BoxListMovies = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh"
}));

export const TypoTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  textAlign: "center",
}));

export const BoxNoDescription = styled(Box)(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  margin: "25px",
}));

export const StylesTrailer = {
  border: "3px solid #FFF",
  margin: "0 auto",
};