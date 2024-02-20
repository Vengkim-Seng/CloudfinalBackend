import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";

function EditItemDrawer({ dataType, item, onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [formData, setFormData] = useState({ ...item });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    const isFileInput = files?.length > 0;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: isFileInput ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    onUpdate(data); // Ensure onUpdate can handle FormData
    onClose();
  };

  const renderInputFields = () => {
    if (dataType === "cars") {
      return (
        <>
          <Box>
            <FormLabel htmlFor="photo1">Photo 1</FormLabel>
            <Input type="file" id="photo1" onChange={handleChange} size="md" />
          </Box>

          <Box>
            <FormLabel htmlFor="photo2">Photo 2</FormLabel>
            <Input type="file" id="photo2" onChange={handleChange} size="md" />
          </Box>
          <Box>
            <FormLabel htmlFor="brand">Brand</FormLabel>
            <Input
              ref={firstField}
              id="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="model">Model</FormLabel>
            <Input id="model" value={formData.model} onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="gearbox">Gearbox</FormLabel>
            <Input
              id="gearbox"
              value={formData.gearbox}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="fuel_type">Fuel Type</FormLabel>
            <Input
              id="fuel_type"
              value={formData.fuel_type}
              onChange={handleChange}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input id="price" value={formData.price} onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="available">Availability</FormLabel>
            <Input
              id="available"
              value={formData.available}
              onChange={handleChange}
            />
          </Box>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Button
        leftIcon={<EditIcon color={"white"} />}
        colorScheme="green"
        _hover={{ bg: "green", color: "white" }}
        onClick={onOpen}
      >
        Edit
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader borderBottomWidth="1px">Edit {dataType}</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">{renderInputFields()}</Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" px={7} onClick={handleSubmit}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default EditItemDrawer;
