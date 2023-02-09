using System;
using System.Collections.Generic;

namespace ProjectCRUD.Models;

public partial class Contact
{
    public int IdContact { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }
}
