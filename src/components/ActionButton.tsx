import { Button, Stack } from "@mui/material";

interface ActionButtonProps {
  handleClickCancel: () => void;
  handleClickApply: () => void;
  disabledApplyButton: boolean;
}
const ActionButton: React.FC<ActionButtonProps> = ({
  handleClickCancel,
  handleClickApply,
  disabledApplyButton,
}) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-around"}
      gap={2}
      width={"100%"}
      pt={{ xs: 2, md: 4 }}
    >
      <Button sx={{ color: "error.main" }} onClick={handleClickCancel}>
        Відмінити
      </Button>
      <Button
        sx={{ color: "success.main" }}
        onClick={handleClickApply}
        disabled={disabledApplyButton}
      >
        Підтвердити
      </Button>
    </Stack>
  );
};

export default ActionButton;
