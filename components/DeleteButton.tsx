"use client";

import React, { useState } from "react";
import { deleteProjects } from "@/app/action/projectAction"; // Import server action

// Modal component for confirmation
const ConfirmationModal = ({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-full">
        <h3 className="text-xl font-semibold text-center">
          Are you sure you want to delete this project?
        </h3>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal component for success/error messages
const MessageModal = ({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 w-full">
      <div className="bg-white p-6 rounded-md shadow-lg w-full">
        <h3 className="text-lg font-semibold text-center">{message}</h3>
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteButton = ({ projectId }: { projectId: string }) => {
  const [isPending, setIsPending] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleDelete = async () => {
    setIsPending(true);
    const res = await deleteProjects(projectId);
    if (res.success) {
      setModalMessage("Project deleted successfully");
    } else {
      setModalMessage(res.message || "Something went wrong");
    }
    setMessageModalVisible(true);
    setIsPending(false);
  };

  const handleConfirmation = () => {
    setConfirmationModalVisible(false);
    handleDelete(); // Proceed with delete
  };

  const handleCancel = () => {
    setConfirmationModalVisible(false); // Close confirmation modal without deleting
  };

  const handleModalClose = () => {
    setMessageModalVisible(false); // Close success/error modal
  };

  return (
    <>
      <button
        onClick={() => setConfirmationModalVisible(true)}
        disabled={isPending}
        className="px-4 py-2 bg-red-500 text-white rounded text-xs"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>

      {/* Confirmation Modal */}
      {confirmationModalVisible && (
        <ConfirmationModal
          onConfirm={handleConfirmation}
          onCancel={handleCancel}
        />
      )}

      {/* Success/Error Modal */}
      {messageModalVisible && (
        <MessageModal message={modalMessage} onClose={handleModalClose} />
      )}
    </>
  );
};

export default DeleteButton;
