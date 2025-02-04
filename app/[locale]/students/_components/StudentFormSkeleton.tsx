import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Skeleton,
 
} from "@mui/material";

const StudentsFormSkeleton = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="xs" component={Paper} elevation={5}>
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: "50vh",
            width: "100%",
          }}
        >
          {/* Skeleton for Title */}
          <Skeleton variant="text" width="50%" sx={{ mx: "auto", mb: 2 }} />

          {/* Skeleton for First Name */}
          <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
          <Divider sx={{ my: 1 }} />

          {/* Skeleton for Last Name */}
          <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
          <Divider sx={{ my: 1 }} />

          {/* Skeleton for Matriculation */}
          <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
          <Divider sx={{ my: 1 }} />

          {/* Skeleton for Email */}
          <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
          <Divider sx={{ my: 1 }} />

          {/* Skeleton for Submit Button */}
          <Button fullWidth variant="contained" disabled sx={{ my: 3 }}>
            <Skeleton variant="rectangular" width="100%" height={40} />
          </Button>
        </Box>
      </Container>
    </Container>
  );
};

export default StudentsFormSkeleton;
