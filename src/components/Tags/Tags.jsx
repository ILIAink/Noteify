import CreatableSelect from "react-select/creatable";
import React, { useState } from "react";

const Tags = () => {
  const [selectedTags, setSelectedTags] = useState([]);

  const [tagOptions, setTagOptions] = useState([
    { value: "tag1", label: "Tag 1" },
    { value: "tag2", label: "Tag 2" },
    { value: "tag3", label: "Tag 3" },
    // Add more tag options as needed
  ]);

  const handleTagSelect = (selectedOptions) => {
    setSelectedTags(selectedOptions);
  };

  const handleRemoveTag = (removedTag) => {
    const updatedTags = selectedTags.filter(
      (tag) => tag.value !== removedTag.value
    );
    setSelectedTags(updatedTags);
    setTagOptions((prevOptions) =>
      prevOptions.filter((option) => option.value !== removedTag.value)
    );
  };

  const handleCreateTag = (inputValue) => {
    const newTag = { value: inputValue, label: inputValue };
    setTagOptions((prevOptions) => [...prevOptions, newTag]);
    setSelectedTags((prevTags) => [...prevTags, newTag]);
  };

  return (
    <div tags-container>
      <CreatableSelect
        id="tags"
        isMulti
        options={tagOptions}
        value={selectedTags}
        onChange={handleTagSelect}
        onCreateOption={handleCreateTag}
      />
      {/* {selectedTags.length > 0 && (
        <div>
          <label>Selected Tags:</label>
          {selectedTags.map((tag) => (
            <div key={tag.value}>
              {tag.label}{" "}
              <button type="button" onClick={() => handleRemoveTag(tag)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Tags;
