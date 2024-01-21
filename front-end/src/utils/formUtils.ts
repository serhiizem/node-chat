import React from "react";

export const extractFormDataAsJson = (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    return Object.fromEntries((formData).entries());
}