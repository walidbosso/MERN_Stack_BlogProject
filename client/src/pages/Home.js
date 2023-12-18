import React from "react";

const Home = () => {
  return (
    // mb: margin bottom = 20, mx left and right, my top and bottom
    <div className="mb-20">
      {/* sm: small device, my: margin top and bottom = 6 */}
      <h1 className="sm:text-4xl text-2xl font-bold my-6 text-gray-900">
        Hello, welcome to my Blog
      </h1>
      <p className="mx-auto leading-relaxed text-base mb-4">
      
        anyway. Finally! lmao after two certificates and one week of an IBM
        course xD
      </p>
      <p className="mx auto leading-relaxed text-base mb-4">
        c:\Users\
      </p>
      <p className="mx auto leading-relaxed text-base mb-4">
        If you've already installed Ubuntu within a QEMU virtual machine using
        the command you mentioned: ```bash qemu-system-x86_64 -hda ubuntu.qcow2
        -cdrom ubuntu.iso -boot d -m 2048 ``` You don't need to use the same
        installation command every time you want to start the virtual machine.
        Once Ubuntu is installed and running within the virtual machine, you can
        simply start the virtual machine using the following command: ```bash
        qemu-system-x86_64 -hda ubuntu.qcow2 -m 2048 ``` This command assumes
        that: - `ubuntu.qcow2` is the virtual disk image where Ubuntu is
        installed. - You're allocating 2048MB (2GB) of RAM to the virtual
        machine, as specified by the `-m` option. By omitting the `-cdrom` and
        `-boot` options, you're telling QEMU to boot from the virtual hard drive
        (`-hda ubuntu.qcow2`) by default, as you've already installed Ubuntu
        there. This command will start the virtual machine and boot it into
        Ubuntu, just as it was configured during the installation.
      </p>
    </div>
  );
};

export default Home;
