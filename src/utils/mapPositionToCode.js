function mapPositionToCode(position) {
  const lowerCasePosition = position.toLowerCase();

  switch (lowerCasePosition) {
    case "atacante":
      return "ATA";
    case "centroavante":
      return "ATA";
    case "goleiro":
      return "GOL";
    case "zagueiro":
      return "ZAG";
    case "zagueiro Central":
      return "ZGC";
    case "lateral direito":
      return "LTD";
    case "lateral esquerdo":
      return "LTE";
    case "volante":
      return "VOL";
    case "meio de campo":
      return "MC";
    case "meio de campo direito":
      return "MCD";
    case "meio de campo esquerdo":
      return "MCE";
    case "meio de campo ofensivo":
      return "MCO";
    default:
      return "ND";
  }
}

export default mapPositionToCode;