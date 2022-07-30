import React from "react";
import "./common.css";
import {
  Text,
  Flex,
  TextField,
  Provider,
  Button,
  View,
  Grid,
  ComboBox,
  Item,
  TableBody,
  TableHeader,
  TableView,
  Row,
  Column,
  Cell,
  DialogTrigger,
  Dialog,
  ActionButton,
  AlertDialog,
} from "@adobe/react-spectrum";
import Edit from "@spectrum-icons/workflow/Edit";
import Delete from "@spectrum-icons/workflow/Delete";
import Share from "@spectrum-icons/workflow/Share";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

class ExistingConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      project: "",
      showEdit: false,
      selection: [],
      text: "",
    };
  }

  onClick = (e) => {
    e.preventDefault();
    var field2 = document.getElementById("field2");
    var fieldP = document.getElementById("projects");
    var val = field2.value;
    var valP = fieldP.value;
    this.setState({
      showEdit: true,
      status: val,
      selection: [],
      text: "",
      project: valP,
    });
  };

  handleSelection(e) {
    const vals = Array.from(e);
    console.log(vals);

    this.setState({
      selection: vals,
      text: vals.join(", "),
    });
  }

  onClickDelete = (e) => {
    return (
      <Provider>
        <DialogTrigger>
          <ActionButton>Exit</ActionButton>
          <AlertDialog
            variant="information"
            title="Register profile"
            primaryActionLabel="Register"
            secondaryActionLabel="Remind me later"
            cancelLabel="Cancel"
          >
            You have not saved your profile information for this account. Would
            you like to register now?
          </AlertDialog>
        </DialogTrigger>
      </Provider>
    );
  };

  onClickEdit = (e) => {
    return (
      <Provider>
        <DialogTrigger>
          <ActionButton>Exit</ActionButton>
          <AlertDialog
            variant="information"
            title="Register profile"
            primaryActionLabel="Register"
            secondaryActionLabel="Remind me later"
            cancelLabel="Cancel"
          >
            Would you like to register now?
          </AlertDialog>
        </DialogTrigger>
      </Provider>
    );
  };

  onPrimaryAction = (e) => {
    console.log("hello");
  };

  renderTable() {
    var context = this;
    let columns = [
      { name: "Config Name", uid: "id" },
      { name: "Project", uid: "project" },
      { name: "Status", uid: "type" },
    ];

    let rows = [
      { id: "Config 1", project: "Adobe Sign", type: "Active" },
      { id: "Config 2", project: "Adobe Acrobat Web", type: "Active" },
      { id: "Config 3", project: "Adobe Sign", type: "Active" },
      { id: "Config 4", project: "Adobe Acrobat Web", type: "Inactive" },
      { id: "Config 5", project: "Adobe Sign", type: "Inactive" },
      { id: "Config 6", project: "Adobe Acrobat Web", type: "Inactive" },
    ];

    return (
      <TableView
        selectionMode="single"
        aria-label=""
        maxWidth="size-6000"
        onSelectionChange={this.handleSelection.bind(this)}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <Column
              key={column.uid}
              align={column.uid === "type" ? "end" : "start"}
            >
              {column.name}
            </Column>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) =>
            (item.type === context.state.status ||
              context.state.status === "All") &&
            (item.project === context.state.project ||
              context.state.project === "All") ? (
              <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>
            ) : (
              ""
            )
          }
        </TableBody>
      </TableView>
    );
  }

  render() {
    return (
      <Provider colorScheme="light">
        <div className="page">
          <div className="right-panel">
            <h1>
              <br />
              Existing Config
            </h1>
            <Grid
              areas={["label1 field1 button", "label2 field2 button"]}
              columns={["1.25fr", "3fr", "1fr"]}
              height="size-1000"
              width="size-6000"
            >
              <Flex gridArea="label1" alignItems="center">
                <Text>Project: </Text>
              </Flex>
              <Flex gridArea="field1" alignItems="center">
                <ComboBox
                  width="size-3000"
                  id="projects"
                  placeholder="Select Project"
                  defaultInputValue="All"
                >
                  <Item key="all">All</Item>
                  <Item key="p1">Adobe Sign</Item>
                  <Item key="p2">Adobe Acrobat Web</Item>
                </ComboBox>
              </Flex>
              <Flex gridArea="label2" alignItems="center">
                <Text>Status: </Text>
              </Flex>
              <Flex gridArea="field2" alignItems="center" wrap>
                <ComboBox
                  width="size-3000"
                  id="field2"
                  placeholder="Select Config Status"
                  defaultInputValue="All"
                >
                  <Item key="active">Active</Item>
                  <Item key="archived">Archived</Item>
                  <Item key="all">All</Item>
                </ComboBox>
              </Flex>
              <Flex gridArea="button" alignItems="center">
                <Button variant="primary" onClick={this.onClick}>
                  Search
                </Button>
              </Flex>
            </Grid>

            <br />
            <br />

            <div
              className="editSection"
              style={{ display: this.state.showEdit ? "block" : "none" }}
            >
              <div> {this.renderTable()} </div>

              <br />
              <br />
              <Flex gridArea="button" alignItems="center" gap="size-3600">
                <DialogTrigger>
                  <Button
                    variant="primary"
                    isDisabled={this.state.selection.length == 1 ? false : true}
                  >
                    <Edit />
                    <Text>Edit</Text>
                  </Button>
                  <AlertDialog
                    variant="confirmation"
                    title="Edit Config"
                    primaryActionLabel="Continue Editing"
                    cancelLabel="Cancel"
                    autoFocusButton="primary"
                    onPrimaryAction={this.onPrimaryAction}
                  >
                    You have chosen to Edit following config:
                    <br />
                    {this.state.selection}
                    <br />
                    Do you wish to Continue?
                  </AlertDialog>
                </DialogTrigger>

                <DialogTrigger>
                  <Button
                    variant="primary"
                    onClick={this.onClickDelete}
                    isDisabled={this.state.selection.length >= 1 ? false : true}
                  >
                    <Delete />
                    <Text>Delete</Text>
                  </Button>
                  <AlertDialog
                    variant="confirmation"
                    title="Delete Config"
                    primaryActionLabel="Delete"
                    cancelLabel="Cancel"
                    autoFocusButton="primary"
                  >
                    You have chosen to Delete following config:
                    <br />
                    {this.state.text}
                    <br />
                    Do you wish to Continue?
                  </AlertDialog>
                </DialogTrigger>
              </Flex>
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default ExistingConfig;
