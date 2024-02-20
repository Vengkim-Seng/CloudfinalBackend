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
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import axios from "axios";

function CreateItemDrawer({ dataType, onUpdate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = useRef();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [id]: files[0] }); // Assuming single file upload
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios
      .post(`${process.env.REACT_APP_API_BASE_URL}/${dataType}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderInputFields = () => {
    if (dataType === "cars") {
      return (
        <>
          <Box>
            <FormLabel htmlFor="photo1">Photo 1</FormLabel>
            <Input
              ref={firstField}
              id="photo1"
              type="file"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <FormLabel htmlFor="photo2">Photo 2</FormLabel>
            <Input id="photo2" type="file" onChange={handleChange} />
          </Box>
          <Box>
            <FormLabel htmlFor="brand">Brand</FormLabel>
            <Input id="brand" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="model">Model</FormLabel>
            <Input id="model" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="gearbox">Gearbox</FormLabel>
            <Input id="gearbox" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="fuel_type">Fuel Type</FormLabel>
            <Input id="fuel_type" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="price">Price</FormLabel>
            <Input id="price" onChange={handleChange} />
          </Box>

          <Box>
            <FormLabel htmlFor="available">Availability</FormLabel>
            <Input id="available" onChange={handleChange} />
          </Box>
        </>
      );
    }

    return null;
  };

  return (
    <>
      <Button
        colorScheme="telegram"
        ml={4}
        leftIcon={<AddIcon color="white" />}
        onClick={onOpen}
      >
        New item
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
              Create
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateItemDrawer;
